const qawolf = require("qawolf");
const { setupTestEnvironment } = require('../bdd/support/setup')

setupTestEnvironment()

test("foo", async () => {
  const page = await context.newPage();
  await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
  await page.click(".text-center .row");
  await page.click('text="Album example"');
  await page.click(".btn-secondary");
  await page.click(".btn");
  const button = page.$(".btn") 
  expect(button).toBeDefined()
})