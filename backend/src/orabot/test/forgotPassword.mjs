import { Builder, Browser, By, Key, until } from 'selenium-webdriver';
import { assert } from 'chai';


describe('forgot password', function() {
    it('should send email after requesting help', async function () {
        let driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('https://team16.kenscourses.com/');
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div/div/p[3]')).click();
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div[2]/div[2]/div[1]/input')), 5000);
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div[2]/div[1]/input')).sendKeys('testEmail@test.com');
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div[2]/div[2]/div[2]/button')).click();
        await driver.sleep(8000);
        const text = await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/h1[1]/b')).getText();
        assert.isTrue(text.includes('ticket'));
        await driver.quit();
        return Promise.resolve();
    });
});