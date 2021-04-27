const path = require('path')
const { spawnCmd } = require('@keg-hub/spawn-cmd')
const { chromium, firefox, webkit } = require('playwright')
const rootDir = path.join(__dirname, '../../../')

// websockify -v --web /usr/share/_novnc 0.0.0.0:26367 0.0.0.0:26370
const startSockify = async () => {
  return spawnCmd('websockify', {
    args: [
      '-v',
      '--web',
      '/usr/share/_novnc',
      '0.0.0.0:26367',
      '0.0.0.0:26370'
    ],
    options: { env: process.env },
    cwd: path.join(__dirname, '../../../')
  })
}

// Xtigervnc -SecurityTypes None -geometry 1288x804x24 -rfbauth /root/.vnc/passwd -rfbport 26370 -alwaysshared :0
const startTigerVNC = async () => {
  return spawnCmd('Xtigervnc', {
    args: [
      '-SecurityTypes',
      'None',
      '-geometry',
      '1288x804x24',
      // '-rfbauth',
      // '/root/.vnc/passwd',
      '-rfbport',
      '26370',
      '-alwaysshared',
      ':0'
    ],
    options: { env: process.env },
    cwd: path.join(__dirname, '../../../')
  })
}

const screenCast = async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 50,
    devtools: true,
    channel: "chrome",
    args: [
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--no-sandbox',
      '--window-position=0,0',
    ]
  })
  const context = await browser.newContext()
  const page = await context.newPage()
  await page.goto('https://google.com')
  await page.pause()
}

/**
 * Listen for "(cmd|ctrl) + c" keyboard events, and exit the running process
 */
process.on("SIGINT", () => {
  Logger.empty()
  console.log(`\n[ Screen-Cast ] Browser terminated by user!\n`)
  process.exit(0)
})
// setInterval(() => {
//   // Keeping Node process alive until SIGINT
// }, 1 << 30);

require.main === module ? screenCast() : (module.exports = { screenCast })