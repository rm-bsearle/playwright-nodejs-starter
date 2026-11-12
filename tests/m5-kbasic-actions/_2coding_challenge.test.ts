/** CODING CHALLENGE
 *** Write a test that checks for form validation reset.
 *** Click on Register and check that validation messages
 *** are visible, refresh the page, and check they become
 *** invisible.
 **/

 import { test, expect } from '@playwright/test'


 test('registration validation messages reset after reload', async ({ page }) => {
    await page.goto('/');

    const validationMessages = [
        'Valid first name is required',
        'Valid last name is required',
        'Please enter a valid email address',
    ]

    await page.getByRole('button', { name: 'Register'}).click();

    for(const message of validationMessages) {
        await expect(page.getByText(message, { exact: true })).toBeVisible();
    }

    await page.reload();

    for(const message of validationMessages) {
        await expect(page.getByText(message, { exact: true })).toBeHidden();
    }
 });