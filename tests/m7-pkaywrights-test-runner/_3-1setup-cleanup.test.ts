import { test, expect } from '@playwright/test';

// Run tests sequentially: npx playwright test: ./tests/m7-pkaywrights-test-runner/_3-1setup-cleanup.test.ts --workers 1
// Will result in expected order, but running without results in the beforeAll and afterAll being
// executed more then once because it executes once per worker process.

test.beforeAll('Meaningful description', async () => {
    console.log('Before All setup');
});

test.beforeEach('Meaningful description', async ({ page }) => {
    console.log('Before each setup');
    page.goto('');
});

test('Test 1', async ({ page }) => {
    console.log('Test 1');
    await expect(page.getByRole('button')).toHaveCount(3);
})

test('Test 2', async ({ page }) => {
    console.log('Test 2');
    await expect(page.getByRole('checkbox')).toHaveCount(1);
})

test.afterEach('Meaningful description', async ({ page }) => {
    console.log('After Each cleanup');

});

test.afterAll('Meaningful description', async () => {
    console.log('After All cleanup');
});