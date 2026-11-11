import { test, expect } from '@playwright/test';

test('Recommended built-in locators', async ({ page }) => {
    await page.goto('');

    const firstName = page.getByLabel('First Name');
    await firstName.fill('Sofia');
    await firstName.clear();

    await page.getByLabel('First Name').fill('Andrejs');
});