import { test, expect } from '@playwright/test';

const people = ['Alice', 'Bob']

for(const name of people) {
    test(`Testing ${name}`, async () => {
        console.log(name);
    });
}

const map1 = new Map();
map1.set(2,20);
map1.set(3,30);

for(const [key, value] of map1) {
    test(`testing 10x function with ${key} and ${value}`, async () => {
        console.log(key, value);
        expect(key * 10).toEqual(value);
    });
}

// With three or more values, you can use an array of arrays.
// However, you may be getting into non trivial test data and
// might want to keep it in a CSV or other external file.

const inputs = [
    ["a", 1, 2],
    ["b", 3, 4],
    ["c", 5, 6],
]

for (const [a, b, c] of inputs) {
    test(`testing with ${a} ${b} ${c}`, async () => {
        console.log(a, b, c)
    });
}

const inputs2 = [
    ["10", "6 months", "After 6 Months you will earn $0.20 on your deposit" ],
    ["20", "1 Year", "After 1 Year you will earn $1.00 on your deposit" ],
];

for (const [sum, period, result] of inputs2) {
    test(`testing with ${sum} ${period} ${result}`, async ({ page }) => {

        page.goto('/savings.html');
        await page.getByTestId('deposit').fill(sum);
        await page.getByTestId('period').selectOption(period);

        await expect(page.getByTestId('result')).toHaveText(result);

    });
}