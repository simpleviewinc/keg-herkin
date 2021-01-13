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

  test('Click increment button', async () => {
    const button = await page.$('#incrementInput')
    expect(button).not.toBe(undefined)
    button.click()
    
    const label = await page.$('#number')
    expect(parseFloat(label.innerText)).toEqual(5)
  })
})