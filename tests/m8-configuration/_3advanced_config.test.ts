import { test, chromium, devices } from '@playwright/test';

const ipad = devices['iPad Pro 11']

const slowAndHeadless = { headless: false, slowMo: 2000 };

interface LocationData {
    latitude: number;
    longitude: number;
};

const locationCoordinates: Record<string, LocationData> = {
    London: { latitude: 51.509865, longitude: -0.118092 },
    Rome: { latitude: 41.9027835, longitude: 12.4963655 },
};

const london = locationCoordinates['London'];
const Rome = locationCoordinates['Rome'];

test('Test 1', async ({ page }) => {

    const browser = await chromium.launch(slowAndHeadless);

    const context = await browser.newContext({
        geolocation: { longitude: london.longitude, latitude: london.latitude },
    });

});

test('Test 2', async () => {

    const browser = await chromium.launch();

    const context = await browser.newContext({
        viewport: ipad.viewport,
        userAgent: ipad.userAgent,
        deviceScaleFactor: ipad.deviceScaleFactor,
        locale: 'en_GB',
        geolocation: { latitude: london.latitude, longitude: london.longitude },
        permissions: ['geolocation'],
    });

    const page = await context.newPage();

    page.goto('https://maps.google.com');
    await page.getByRole('button', { name: 'Accept all' }).click();
    await page.getByRole('button', { name: 'Stay on web' }).click();
    await page.screenshot({ path: 'London-iPad.png' });
});