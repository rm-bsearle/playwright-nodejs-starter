import { test, expect } from '@playwright/test';
import { request } from 'http';

test('Request / Response Overview', async ({ page }) => {

  const response = await page.goto('');

  if (response === null) return;

  console.log(response.url());
  console.log(response.status());
  console.log(response.ok());
  expect(response.ok()).toBeTruthy();

  console.log(await response.allHeaders()); // as object with props:vals
  console.log(await response.headersArray());

  console.log(await response.body()); // buffered response body
  console.log(await response.text());

//   console.log(await response.json()); // error if not parseable JSON

    const request = response.request(); // The request that was originally sent
    console.log(await request.allHeaders());
    console.log(request.method());  // GET

});

// Can do pure API testing using request fixture without creating browser windows/instances
test('Request / Response', async ({ request }) => {

    const response = await request.get('https://api.github.com/');

    console.log(response.ok());
    console.log(response.status());

    console.log(response.headersArray());
    console.log(await response.json());

});