import { Builder, Browser, By, Key, until } from 'selenium-webdriver';
import { assert } from 'chai';


describe('login', function() {
    it('should login as developer', async function () {
        let driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('https://team16.kenscourses.com/');
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div/form/div/div[1]/input')).sendKeys('test@test.com');
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div/form/div/div[2]/input')).sendKeys('test123');
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div/form/div/div[3]/div/button')).click();
        await driver.sleep(5000);
        const text = await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/p')).getText();
        assert.isTrue(text.includes('Developer'));
        await driver.quit();
        return Promise.resolve();
    });

    it('should login as manager', async function () {
        let driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('https://team16.kenscourses.com/');
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div/form/div/div[1]/input')).sendKeys('juanjosalco@gmail.com');
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div/form/div/div[2]/input')).sendKeys('Jj123');
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div/form/div/div[3]/div/button')).click();
        await driver.sleep(5000);
        const text = await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/p')).getText();
        assert.isTrue(text.includes('Manager'));
        await driver.quit();
        return Promise.resolve();
    });
});