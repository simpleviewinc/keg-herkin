describe('Example Tests', () => {
  beforeAll(async() => {
    // the server config will start up the example app before running tests
    // see <root>/configs/jest-playwright.config.js
    await page.goto('http://localhost:3000/')
  })

  it('should add two numbers', () => {
    expect(1+1).toBe(2)
  })

  test('should find the nav-bar button on the page', async () => {
    const button = await page.$$('button.navbar-toggler')
    expect(button).not.toBe(null)
  })

  test('Click "left" button', async () => {
    const button = await page.$('#leftInput')
    expect(button).not.toBe(null)
    await button.click()

    const label = await page.$('#label-text')
    expect(await label.innerText()).toEqual('left')
  })
})