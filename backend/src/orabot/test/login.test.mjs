import { Builder, By, Key, until } from 'selenium-webdriver';
import { assert } from 'chai';
import * as fs from 'fs';

describe('search', async function () {
    this.timeout(10000);
    let driver;

    if (!fs.existsSync('./screenshots')){
        fs.mkdirSync('./screenshots');
    }

    // A helper function to start a web search
    const login = async (email, password) => {
        // Automate DuckDuckGo search
        await driver.get('https://team16.kenscourses.com/');
        const emailInput = await driver.findElement(
             By.xpath('//*[@id="root"]/div/div[2]/div/input[1]'));
        const passInput = await driver.findElement(
            By.xpath('//*[@id="root"]/div/div[2]/div/input[2]'));
        const loginButton = await driver.findElement(
            By.xpath('//*[@id="root"]/div/div[2]/button[1]'));
        await emailInput.sendKeys(email);
        await passInput.sendKeys(password);
        await loginButton.click();
        

        // Wait until the result page is loaded
        await driver.wait(5000);

        const text = await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/h1')).getText();

        return text;
    };

    // Make sure the BROWSER env variable is set
    before(async function() {
        if (!process.env.BROWSER) {
            throw new Error('No BROWSER environment variable set')
        }
    });

    // Before each test, initialize Selenium and launch the browser
    beforeEach(async function() {
        // Microsoft uses a longer name for Edge
        let browser = process.env.BROWSER;
        if (browser == 'edge') {
            browser = 'MicrosoftEdge';
        }
        if (browser == 'chrome') {
            browser = 'Chrome';
        }

        // Connect to service specified in env variable or default to 'selenium'
        const host = process.env.SELENIUM || 'selenium';
        const server = `http://${host}:4444`;
        driver = await new Builder()
            .usingServer(server)
            .forBrowser(browser)
            .build();
    });

    // After each test, take a screenshot and close the browser
    afterEach(async function () {
        if (driver) {
            // Take a screenshot of the result page
            const filename = this.currentTest.fullTitle()
                .replace(/['"]+/g, '')
                .replace(/[^a-z0-9]/gi, '_')
                .toLowerCase();;
            const encodedString = await driver.takeScreenshot();
            await fs.writeFileSync(`./screenshots/${filename}.png`,
                encodedString, 'base64');

            // Close the browser
            await driver.quit();
        }
    });

    // Our test definitions
    it('should login to the service as a developer', function (done) {
        return login('a00227255@tec.mx', '123456').then(text => {
            console.log("this test", text);
            assert.isTrue(text === 'Welcome to the OraBot!');
            done();
        });
    });
});