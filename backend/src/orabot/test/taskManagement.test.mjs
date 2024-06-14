import { Builder, Browser, By, Key, until } from 'selenium-webdriver';
import { assert } from 'chai';


describe('create task', function() {
    it('should create a test task', async function () {
        let driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('https://team16.kenscourses.com/');
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div/form/div/div[1]/input')).sendKeys('test@test.com');
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div/form/div/div[2]/input')).sendKeys('test123');
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div/form/div/div[3]/div/button')).click();
        // Wait until the result page is loaded
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div[3]/div/div[2]/a')), 5000);
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div/div[2]/a')).click();
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div[1]/input')).sendKeys('Test task');
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div[2]/textarea')).sendKeys('Test task description');
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div[3]/button[1]')).click();
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div[4]/div[2]/div/input')).sendKeys('10102025');
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div[5]/div/div[2]/button')).click();
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div[2]/div/h1')), 5000);
        const text = await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/p')).getText();
        assert.isTrue(text.includes('Developer'));
        await driver.quit();
        return Promise.resolve();
    });

    it('should delete a test task', async function () {
        let driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('https://team16.kenscourses.com/');
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div/form/div/div[1]/input')).sendKeys('test@test.com');
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div/form/div/div[2]/input')).sendKeys('test123');
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div/form/div/div[3]/div/button')).click();
        // Wait until the result page is loaded
        await driver.sleep(4000);

        let task = await driver.findElement(By.xpath('//*[@id="root"]/div/div[4]/div[last()]'));
        await task.findElement(By.xpath('..//div/div[2]/div[1]/div/a/img')).click();

        await driver.sleep(1000);

        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div[5]/div[1]/div[2]/button')).click();
        await driver.sleep(500);
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div/div[2]/button')).click();
        await driver.sleep(2000);
        const text = await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/p')).getText();
        assert.isTrue(text.includes('Developer'));

        await driver.quit();
        return Promise.resolve();
    });
});