import { expect, test } from '@playwright/test'


test('input fields', async ({ page }, testInfo) => {
    await page.goto('/')
    if (testInfo.project.name == 'Mobile Chrome') {                  //to run them on both platforms, desktop and mobile, you can use a property of testInfo
        await page.locator('.sidebar-toggle').click()
    }

    
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()

    if (testInfo.project.name == 'Mobile Chrome') { 
        await page.locator('.sidebar-toggle').click()
    }
    const usingTheGridEmailInput = page.locator('nb-Card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"})  
    await usingTheGridEmailInput.fill('test@test.com')
    await usingTheGridEmailInput.clear()
    await usingTheGridEmailInput.pressSequentially('test2@test.com')

    const inputValue = await usingTheGridEmailInput.inputValue()
    expect(inputValue).toEqual('test2@test.com')

    await expect(usingTheGridEmailInput).toHaveValue('test2@test.com')
})