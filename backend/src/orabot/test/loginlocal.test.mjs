import { Builder, Browser, By, Key, until } from 'selenium-webdriver';
import { assert } from 'chai';


describe('login', function() {
    it('should login as developer', async function () {
        let driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('https://team16.kenscourses.com/');
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/div/input[1]')).sendKeys('test@test.com');
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/div/input[2]')).sendKeys('test123');
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/button')).click();
        await driver.sleep(5000);
        const text = await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/h1')).getText();
        assert.isTrue(text.includes('these are your tasks'));
        await driver.quit();
        return Promise.resolve();
    });

    it('should login as manager', async function () {
        let driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('https://team16.kenscourses.com/');
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/div/input[1]')).sendKeys('juanjosalco@gmail.com');
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/div/input[2]')).sendKeys('Jj123');
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/button')).click();
        await driver.sleep(5000);
        const text = await driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/h1')).getText();
        assert.isTrue(text.includes('team'));
        await driver.quit();
        return Promise.resolve();
    });
});