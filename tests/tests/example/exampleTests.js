describe('Example Tests', () => {
  beforeAll(async() => {
    // localhost for testing purposes
    await page.goto('http://localhost:3000/')
  })

  it('should add two numbers', () => {
    expect(1+1).toBe(2)
  })

  test('should find the nav-bar button on the page', async () => {
    const button = await page.$('button.navbar-toggler')
    expect(button).not.toBe(undefined)
  })

})