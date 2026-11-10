import { test, expect } from '@playwright/test';

test('Simple assertion', async () => {
    expect('a').toEqual('a');
    expect(2).toBeLessThan(3);
    expect(null).toBeFalsy();
});

test('Test with simple auto-retruying assertions', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    await expect(page).toHaveTitle('Credit Association');
    await expect(page).toHaveURL('http://localhost:3000'); 
})