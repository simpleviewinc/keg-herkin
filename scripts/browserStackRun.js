const webdriver = require('selenium-webdriver')
const { BROWSER_STACK_USER, BROWSER_STACK_KEY } = process.env

let __DRIVER

const buildBrowserstackURL = url => {
  return url || `https://${BROWSER_STACK_USER}:${BROWSER_STACK_KEY}@hub-cloud.browserstack.com/wd/hub`
}


const buildConfig = (config={}) => {
  return {
    os: 'Windows',
    os_version: '10',
    browserName: 'Chrome',
    browser_version: '80',
    name: "Browserstack Chrome Test",
    ...config
  }
}

const getDriver = (config={}, url) => {
  __DRIVER = __DRIVER || new webdriver.Builder()
    .usingServer(buildBrowserstackURL(url))
    .withCapabilities(buildConfig(config))
    .build()

  return __DRIVER
}

const googleTitleTest =  async config => {
  const driver = getDriver(config)
  
  await driver.get('http://www.google.com')

  await driver.findElement(webdriver.By.name('q')).sendKeys('BrowserStack')

  const title = await driver.getTitle()

  console.log(title)

  driver.quit()

}

module.exports = {
  getDriver,
  googleTitleTest
}
