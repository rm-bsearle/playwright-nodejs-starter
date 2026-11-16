import { test, expect } from '@playwright/test';
import fs from 'fs';

test('Download a Single file and assert', async ({ page }) => {
    page.goto('/savings.html');

    const downloadPromise = page.waitForEvent('download');

    await page.getByText('Download Our Offer').click();

    const download = await downloadPromise;

    const suggestedFileNmae = download.suggestedFilename();
    const filePath = 'download/' + suggestedFileNmae;
    await download.saveAs(filePath);

    expect(await download.failure()).toBeNull();

    expect(fs.existsSync(filePath)).toBeTruthy();

    const fileSizeInBytes = fs.statSync(filePath).size;
    console.log(fileSizeInBytes);
    expect(fileSizeInBytes).toBeLessThan(20_000);
});