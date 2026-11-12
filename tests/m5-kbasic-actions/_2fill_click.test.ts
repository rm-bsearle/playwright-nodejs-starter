import { test, expect } from '@playwright/test';

test('Fill test', async ({ page }) => {
    await page.goto('/');

    await page.getByLabel('First name').fill('Andrejs');
    
    await page.getByLabel('Date of Birth').fill('2023-10-10');
});