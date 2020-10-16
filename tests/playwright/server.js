#!/usr/bin/env node

/**
 * Script should be run on the HOST machine, NOT with in the docker container
 * Starts the playwright chromium server on the HOST machine,
 * The `wsEndpoint` is then passed to the docker container as an ENV - BROWSER_WS_ENDPOINT
*/

const { chromium } = require('playwright');

(async () => {
  const browserServer = await chromium.launchServer({
    headless: false
  })
  const wsEndpoint = browserServer.wsEndpoint()

  console.log(wsEndpoint)

  await new Promise(() => null)
})()