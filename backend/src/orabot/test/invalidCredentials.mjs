import { Builder, Browser, By, Key, until } from 'selenium-webdriver';
import { assert } from 'chai';




describe('invalid credentials', function() {
    it('should not login due to invalid credentials', async function () {
        let driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('https://team16.kenscourses.com/');
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div/form/div/div[1]/input')).sendKeys('test@test.com');
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div/form/div/div[2]/input')).sendKeys('test12368715230');
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div/form/div/div[3]/div/button')).click();
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div[2]/div/div/form/p')), 5000);
        const text = await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div/form/p')).getText();
        assert.isTrue(text === 'Invalid credentials');
        await driver.quit();
        return Promise.resolve();
    });
});