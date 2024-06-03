import { Builder, Browser, By, Key, until } from 'selenium-webdriver';
import { assert } from 'chai';


describe('login', function() {
    it('should login as developer', async function () {
        let driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('https://team16.kenscourses.com/');
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/input[1]')).sendKeys('a00227255@tec.mx');
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/input[2]')).sendKeys('123456');
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/button[1]')).click();
        const text = await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/h1')).getText();
        assert.isTrue(text === 'Welcome to OraBot!');
        await driver.quit();
        return Promise.resolve();
    });
});