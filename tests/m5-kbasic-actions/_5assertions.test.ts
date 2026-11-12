import { test, expect } from '@playwright/test';

test('Check test', async ({ page }) => {

    await page.goto('/');

    // invoke page-related functions
    await expect(page).toHaveTitle('Credit Association');

    const checkbox = page.getByRole('checkbox');
    const textarea = page.locator('#textarea');
    const message = 'Recommended by a friend';

    // Check then uncheck checkbox and assert on textarea
    await expect(textarea).toBeDisabled();
    await expect(textarea).toBeEmpty();

    await checkbox.check();
    await expect(textarea).toBeEnabled();

    await textarea.fill(message);
    // For text inputs, make sure you use toHaveValue to assert the input's value rather than toContainText
    await expect(textarea).toHaveValue(message);

    await page.getByRole('button', { name: 'Register' }).click();

    // Check count and visibility
    const feedback = page.locator('.invalid-feedback');
    await expect(feedback).toHaveCount(3);

    for (const message of await feedback.all()) {
        await expect(message).toBeVisible();
    }

    await expect(feedback.first()).toContainText('Valid first name is required');
});

test('Test with negating matchers', async ({ page }) => {

    await page.goto('/');

    await expect(page.getByTestId('location')).toContainText('New York');

    await expect(page.getByTestId('location')).not.toContainText('London');
});

test('Test with soft assertions', async ({ page }) => {
    await page.goto('/');

    await expect.soft(page.getByTestId('location')).toContainText('Mumbai');
    await expect.soft(page.getByTestId('location')).toContainText('Tokyo');

    await expect(page.getByTestId('location')).toContainText('New York');
})