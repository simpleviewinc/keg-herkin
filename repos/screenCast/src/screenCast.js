const path = require('path')
const { noOpObj, noPropArr, isArr } = require('@keg-hub/jsutils')
const { create:childProc } = require('@keg-hub/spawn-cmd/src/childProcess')
const { chromium, firefox, webkit } = require('playwright')
const rootDir = path.join(__dirname, '../../../')
const { NO_VNC_PORT=26369, VNC_SERVER_PORT=26370, DISPLAY=':0.0' } = process.env

let VNC_PROC
let SOCK_PROC
let PW_BROWSER

/**
 * Starts tigervnc to allow loading VNC in the browser
 * @param {Object} config - options for setting up tigervnc
 *
 * @example
 * Xtigervnc -SecurityTypes None -geometry 1288x804x24 -rfbport 26370 -alwaysshared :0
 * Xtigervnc -SecurityTypes None -geometry 1288x804x24 -rfbauth /root/.vnc/passwd -rfbport 26370 -alwaysshared :0
 * @returns {Object} - Child process running tigervnc
 */
const startTigerVNC = async ({ args=noPropArr, cwd, env=noOpObj }) => {
  VNC_PROC = VNC_PROC || await childProc({
    cmd: 'Xtigervnc',
    args: [
      '-SecurityTypes',
      'None',
      '-geometry',
      '1288x804x24',
      '-rfbport',
      VNC_SERVER_PORT,
      '-alwaysshared',
      DISPLAY,
      ...args,
    ],
    options: {
      // detached: true,
      // stdio: 'ignore',
      // stdio: 'pipe',
      cwd: cwd || rootDir,
      env: { ...process.env, ...env }
    },
    log: true,
  })

  return VNC_PROC
}

/**
 * Starts websockify to allow loading VNC in the browser
 * @param {Object} config - options for setting up websockify
 *
 * @example
 * websockify -v --web /usr/share/novnc 0.0.0.0:26369 0.0.0.0:26370
 * @returns {Object} - Child process running websockify
 */
const startSockify = async ({ args, cwd, env=noOpObj }) => {
  SOCK_PROC = SOCK_PROC || await childProc({
    cmd: 'websockify',
    args: (args || [
      '-v',
      '--web',
      '/usr/share/novnc',
      `0.0.0.0:${NO_VNC_PORT}`,
      `0.0.0.0:${VNC_SERVER_PORT}`
    ]),
    options: {
      // detached: true,
      // stdio: 'ignore',
      // stdio: 'pipe',
      cwd: cwd || rootDir,
      env: { ...process.env, ...env }
    },
    log: true,
  })

  return SOCK_PROC
}

const screenCast = async ({ vnc=noOpObj, sockify=noOpObj, browser=noOpObj }, exitListener) => {

  // Setup listener to kill process on exit
  exitListener && handleOnExit()

  // Start the VNC server and the websockify server
  await startTigerVNC(vnc)
  await startSockify(sockify)

  PW_BROWSER = PW_BROWSER || await chromium.launch({
    headless: false,
    slowMo: 50,
    devtools: true,
    channel: "chrome",
    ...browser,
    args: [
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--no-sandbox',
      '--window-position=0,0',
      ...(isArr(browser.args) ? browser.args : noPropArr)
    ]
  })

  const context = await PW_BROWSER.newContext()
  const page = await context.newPage()
  await page.goto('https://google.com')

  return {
    context,
    page,
    killScreenCast,
    browser: PW_BROWSER,
    vncProc: VNC_PROC,
    sockProc: SOCK_PROC,
  }
}

const killScreenCast = async () => {
  console.log(`\n\n[ ScreenCast ] Browser terminated!\n`)

  // TODO: Kill browser, validate the close method
  PW_BROWSER && await PW_BROWSER.close()
  PW_BROWSER = null

  // TODO: Kill sockify and vnc process
  VNC_PROC && VNC_PROC.kill && VNC_PROC.kill('SIGHUP')
  VNC_PROC = null
  SOCK_PROC && SOCK_PROC.kill && SOCK_PROC.kill('SIGHUP')
  SOCK_PROC = null
}

/**
 * Listen for "(cmd|ctrl) + c" keyboard events, and exit the running process
 */
const handleOnExit = () => {
  process.on("SIGINT", () => {
    console.log(`\n\n[ ScreenCast ] Browser terminated by user!\n`)
    // Calling exit should automatically kill all child processes
    process.exit(0)
  })
}

require.main === module
  ? screenCast(noOpObj, true)
  : (module.exports = { screenCast, killScreenCast })