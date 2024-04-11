import { test as base } from '@playwright/test'
import { PageManager } from '../pw-practice-app/page-objects/pageManager'

export type TestOptions = {
    globalsQaURL: string
    formLayoutsPage: string
    pageManager: PageManager
}

export const test = base.extend<TestOptions>({
    globalsQaURL: ['', { option: true }],
    
    formLayoutsPage: async ({ page }, use) => {
        await page.goto('/')
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
        await use('')
    },                       //automatically initialized as a very very first thing when we run the test.

    pageManager: async ({ page, formLayoutsPage }, use) => { 
        const pm = new PageManager(page)
        await use(pm)
    }
})
    
