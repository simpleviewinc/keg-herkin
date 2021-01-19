const qawolf = require("qawolf");
const { setupTestEnvironment } = require('../bdd/support/setup')

setupTestEnvironment()

test("zip", async () => {
  const page = await context.newPage();
  await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
  await page.click(".lead");
  await page.click(".lead");
})