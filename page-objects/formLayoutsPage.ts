import { Locator, Page, expect, test } from '@playwright/test';
import { HelperBase } from './helperBase';


export class FormLayoutsPage extends HelperBase{ 

    constructor(page: Page) { 
        super(page)
        
    }
    async submitUsingTheGridFormWithCredentialAndSelectOption(email: string, password: string, optionText: string) { 
        const usingTheGridForm = this.page.locator('nb-Card', { hasText: "Using the Grid" })
        await usingTheGridForm.getByRole('textbox', { name: "Email" }).fill(email)
        await usingTheGridForm.getByRole('textbox', { name: "Password" }).fill(password)
        await usingTheGridForm.getByRole('radio', { name: optionText }).check({ force: true })
        await usingTheGridForm.getByRole('button').click()

    }
    /**
     * This method will out Inline form with user detail
     * @param name - should be first and last name
     * @param email - valid email for the test user
     * @param rememberMe - true or false if user session to be safed
     */
    async submitInlineFormWithNameEmailCheckbox(name: string, email: string, rememberMe: boolean) { 
        const inlineForm = this.page.locator('nb-Card', { hasText: "Inline form" })
        await inlineForm.getByRole('textbox', { name: "Jane Doe" }).fill(name)
        await inlineForm.getByRole('textbox', { name: "Email" }).fill(email)
        if (rememberMe)
            await inlineForm.getByRole('checkbox').check({ force: true })
            await inlineForm.getByRole('button').click()
    }
  
}