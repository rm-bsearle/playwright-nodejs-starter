import { test, chromium } from '@playwright/test';

test('Test with Page fixture', async ( {page} ) => {
    await page.goto('https://playwright.dev/');

    console.log("Test content: ", await page.title());
});

test('other fixtures', async({ browserName, browser, context, page }) => {

})