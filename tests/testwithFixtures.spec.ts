import { test } from '../test-options'
import { faker} from '@faker-js/faker'


test('parametrized methods', async ({ pageManager }) => { 
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ','')}${faker.number.int(100)}@test.com`

    await pageManager.onFormLayoutsPage().submitUsingTheGridFormWithCredentialAndSelectOption(process.env.USEREMAIL, process.env.PASSWORD, 'Option 2')
    await pageManager.onFormLayoutsPage().submitInlineFormWithNameEmailCheckbox(randomFullName, randomEmail, false)
})