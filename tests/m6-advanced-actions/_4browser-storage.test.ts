import { test, expect } from '@playwright/test';

const name = 'sofia';

test('Storage - test from the UI Perspective', async ({ page }) => {

    await page.goto('/');

    const input = page.getByLabel('First name');
    await input.fill(name);
    page.reload();
    await expect(input).toHaveValue('');

    await input.fill(name);
    await page.getByRole('button', { name: 'Save Input' }).click();
    page.reload();
    await expect(input).toHaveValue(name);

});

test('Local Storage', async ({ page }) => {

    await page.goto('/');
    page.getByLabel('First name').fill(name);
    await page.getByRole('button', { name: 'Save Input' }).click();

    const storage = await page.context().storageState();

    console.log(storage.cookies);

    // Local storage
    console.log(storage.origins[0].localStorage);

    // https://playwright.dev/docs/api/class-browsercontext
});