import {expect, test} from '@playwright/test'

test.beforeEach(async({page}) => {
  await page.goto('/')
  await page.getByText('Forms').click()
  await page.getByText('Form Layouts').click()
})

test('Locator syntax rules', async({page}) => {
  //by Tag name
  await page.locator('input').first().click()

  //by ID
  page.locator('#inputEmail1')

  //by Class value
  page.locator('.shape-rectangle')

  //by attribute
  page.locator('[placeholder="Email"]')

  //by Class value (full)
  page.locator('[class="input - full - width size - medium status - basic shape - rectangle nb - transition"]')

  //combine different selectors (put them together)
  page.locator('input[placeholder = "Email"]')

  //by XPath (Not RECOMMENDED)
  page.locator('//*[@id="inputEmail1"]')

  //by partial text match
  page.locator(':text("Using")')

  //by exact text match
  page.locator(':text-is("Using the Grid")')
})

test('User facing locators', async ({ page }) => { 
  await page.getByRole('textbox', { name: "Email" }).first().click()
  await page.getByRole('button', { name: "Sign In" }).first().click()

  await page.getByLabel('Email').first().click()

  await page.getByPlaceholder('Jane Doe').click()
  
  await page.getByText('Using the Grid').click()

  await page.getByTestId('SignIn').click()

  await page.getByTitle('IoT Dashboard').click()

})

test('locating child elements', async ({ page }) => {
  await page.locator('nb-card nb-radio :text-is("Option 1")').click()
  await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

  await page.locator('nb-card').getByRole('button', { name: "Sign In" }).first().click()       // you can mix the usage of the regular locator method and user facing locator.
  
  await page.locator('nb-card').nth(3).getByRole('button').click()                 //nth(3) find your elements by index, 3 (4-th element in role, start with zero)
})

test('locating parent elements', async ({ page }) => {
  await page.locator('nb-card', {hasText: "Using the Grid" }).getByRole('textbox', { name: "Email" }).click()
  await page.locator('nb-card', {has: page.locator('#inputEmail1') }).getByRole('textbox', { name: "Email" }).click()
  
  await page.locator('nb-card').filter({ hasText: "Basic form" }).getByRole('textbox', { name: "Email" }).click()
  await page.locator('nb-card').filter({ has: page.locator('.status-danger') }).getByRole('textbox', { name: "Password" }).click()

  await page.locator('nb-card').filter({ has: page.locator('nb-checkbox') }).filter({ hasText: "Sign in" })
    .getByRole('textbox', { name: "Email" }).click()
  
  await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', { name: "Email" }).click()
  
})

test('Reusing the Locators', async ({ page }) => {
  // await page.locator('nb-card').filter({ hasText: "Basic form" }).getByRole('textbox', { name: "Email" }).fill('test@test.com')
  // await page.locator('nb-card').filter({ hasText: "Basic form" }).getByRole('textbox', { name: "Password" }).fill('Welcome123')
  // await page.locator('nb-card').filter({ hasText: "Basic form" }).getByRole('button').click()

  const basicForm = page.locator('nb-card').filter({ hasText: "Basic form" })
  const emailField = basicForm.getByRole('textbox', { name: "Email" })

  await emailField.fill('test@test.com')
  await basicForm.getByRole('textbox', { name: "Password" }).fill('Welcome123')
  await basicForm.locator('nb-checkbox').click()
  await basicForm.getByRole('button').click()

  await expect(emailField).toHaveValue('test@test.com')
})

test('extracting value', async ({ page }) => { 
  //single test value - If you want to grab a single text from the web page for your web element, you need to use method text content
  const basicForm = page.locator('nb-card').filter({ hasText: "Basic form" })
  const buttonText = await basicForm.locator('button').textContent()
  expect(buttonText).toEqual('Submit')

  //all text value - If you want to grab all text elements for the list of the web elements.
  const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
  expect(allRadioButtonsLabels).toContain("Option 1")

  //input value -  if you want to get the property value of the input fields, for example, which is not a text, you need to use a method input value.
  const emailField = basicForm.getByRole('textbox', { name: "Email" })
  await emailField.fill('test@test.com')
  const emailValue = await emailField.inputValue()
  expect(emailValue).toEqual('test@test.com')
  
  //value attribute - if you want to get the value of any attributes on the web page

  const placeholderValue = await emailField.getAttribute('placeholder')
  expect(placeholderValue).toEqual('Email')
})

test('Assertions', async ({ page }) => { 
  const basicFormButton = page.locator('nb-card').filter({ hasText: "Basic form" }).locator('button')

  //General Assertions
  const value = 5
  expect(value).toEqual(5)

  const text = await basicFormButton.textContent()
  expect(text).toEqual("Submit")

  //Lacator assertion
  await expect(basicFormButton).toHaveText('Submit')

  //Soft Assertion
  await expect.soft(basicFormButton).toHaveText('Submit')
  await basicFormButton.click()

})