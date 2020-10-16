#!/usr/bin/env node

/**
 * Script should be run in DOCKER, NOT with in the host machine
 * Connects playwright to the hosts playwright server,
 * The `BROWSER_WS_ENDPOINT` is passed to the docker container when is started to allow connecting to the host server
*/

const qawolf = require("qawolf")
const { chromium } = require('playwright')
const { BROWSER_WS_ENDPOINT } = process.env

let browser;
let context;


beforeAll(async () => {
  // The wsEndpoint should look like this => `ws://host.docker.internal:64238/acdcce23a8c27e2ce365d88c0ebcd273`,
  // Replace the hosts local ip address with the host.docker.internal when within the docker container
  browser = await chromium.connect({
    wsEndpoint: BROWSER_WS_ENDPOINT.replace('127.0.0.1', 'host.docker.internal')
  })

  // const context = await browser.newContext()
  context = await browser.newContext()
  await qawolf.register(context)
});

afterAll(async () => {
  await qawolf.stopVideos();
  await browser.close();
});

test("basic", async () => {
  const page = await context.newPage();
  await page.goto("http://local.kegdev.xyz/", { waitUntil: "domcontentloaded" });
});