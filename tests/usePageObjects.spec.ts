import { expect, test } from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
import { faker} from '@faker-js/faker'


test.beforeEach(async({page}) => {
    await page.goto('/')
})

test('navigate to form page @smoke', async ({ page }) => {              //run tag @smoke - npx playwright test --project=chromium --grep @smoke
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datepickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
})

test('parametrized methods', async ({ page }) => { 
    const pm = new PageManager(page)
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ','')}${faker.number.int(100)}@test.com`

    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialAndSelectOption(process.env.USEREMAIL, process.env.PASSWORD, 'Option 2')
    // await page.screenshot({ path: 'screenshots/fromLayoutsPage.png' })
    await pm.onFormLayoutsPage().submitInlineFormWithNameEmailCheckbox(randomFullName, randomEmail, false)
    // await page.locator('nb-Card', { hasText: "Inline form" }).screenshot({path: 'screenshots/inlineForm.png'})
    await pm.navigateTo().datepickerPage()
    await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(10)
    await pm.onDatePickerPage().selectDatePickerWithRangeFromToday(4, 5)
})

