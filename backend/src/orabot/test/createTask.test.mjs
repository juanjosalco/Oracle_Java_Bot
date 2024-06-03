import { Builder, Browser, By, Key, until } from 'selenium-webdriver';
import { assert } from 'chai';


describe('login', function() {
    it('should create a test task', async function () {
        let driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('https://team16.kenscourses.com/');
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/input[1]')).sendKeys('a00227255@tec.mx');
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/input[2]')).sendKeys('123456');
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/button[1]')).click();
        // Wait until the result page is loaded
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div[3]/div[2]/a')), 5000);
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div[2]/a')).click();
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/input')).sendKeys('Test task');
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/textarea')).sendKeys('Test task description');
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div[3]/button[1]')).click();
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div[4]/div[2]/input')).sendKeys('10102025');
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div[5]/div/button[2]')).click();
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div[3]/div[2]/a')), 5000);
        const text = await driver.findElement(By.xpath('//*[@id="root"]/div')).getText();
        console.log("TEST")
        console.log(text)
        assert.isTrue(text.includes('Hi, these are your tasks'));
        await driver.quit();
        return Promise.resolve();
    });
});