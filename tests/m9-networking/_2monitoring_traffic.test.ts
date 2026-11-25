import { test, expect } from "@playwright/test";


test('Monitoring HTTP Traffic', async ({ page }) => {

    // Similar to the monitoring for console event and messages while navigating below
    // page.on('console', msg => {
    //     expect(msg.type()).not.toEqual('error');
    // });

    page.on('request', request => console.log(`>> ${request.method()} ${request.url()}`));

    page.on('response', response => console.log(`<< ${response.status()} ${response.url()}`));

    await page.goto('');

});

test('Testing Http Traffic', async ({ page }) => {

    page.on('response', response => {
        /* assert response status code < 300 */
        expect.soft(response.status(), `Response with status ${response.status()} for URL: ${response.url()}`).toBeLessThan(300);
    });

    await page.goto('');

});