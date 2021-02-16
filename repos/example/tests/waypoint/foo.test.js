const qawolf = require('qawolf')
const { setupTestEnvironment } = require('HerkinTasks/utils/wolf/setupTestEnvironment')

setupTestEnvironment()

test('foo', async () => {
  const page = await context.newPage();
  await page.goto("https://www.google.com/?gws_rd=ssl", { waitUntil: "domcontentloaded" });
  await page.click("xpath=/html/body/div[1]/div[4]");
  await page.click('[aria-label="Search"]');
  await page.fill('[aria-label="Search"]', "wow");
  await page.click("xpath=/html/body/div[1]/div[2]");
  await page.click('[aria-label=" Clear"]');
})