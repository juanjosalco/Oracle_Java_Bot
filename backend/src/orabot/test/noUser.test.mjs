import { Builder, Browser, By, Key, until } from 'selenium-webdriver';
import { assert } from 'chai';


describe('no user', function() {
    it('should not login due to invalid user', async function () {
        let driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('https://team16.kenscourses.com/');
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div/form/div/div[1]/input')).sendKeys('a00000000@tec.mx');
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div/form/div/div[2]/input')).sendKeys('1234567891011');
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div/form/div/div[3]/div/button')).click();
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div[2]/div/div/form/p')), 5000);
        const text = await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div/form/p')).getText();
        assert.isTrue(text === 'User not found');
        await driver.quit();
        return Promise.resolve();
    });
});