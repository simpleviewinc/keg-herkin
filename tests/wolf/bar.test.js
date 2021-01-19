const qawolf = require("qawolf");
const { setupTestEnvironment } = require('../bdd/support/setup')

setupTestEnvironment()

test("bar", async () => {
  const page = await context.newPage();
  await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
  await page.click(".lead");
  await page.click(".btn-secondary");
  await page.click(".btn");
  await page.click(".btn-secondary");
  await page.click('text="Album example"');
  await page.click('text="Album example"');
  await page.click('text="Album example"');
  await page.click('text="Album example"');
  await page.click(".lead");
  await page.click(".col-lg-6");
})