import { Locator, Page, expect, test } from '@playwright/test';
import { HelperBase } from './helperBase';


export class NavigationPage extends HelperBase{ 

    readonly formLayoutsMenuItem: Locator
    readonly datepickerMenuItem: Locator
    readonly smartTableMenuItem: Locator
    readonly toastrMenuItem: Locator
    readonly tooltipMenuItem: Locator

    constructor(page: Page) { 
        super(page)
        this.formLayoutsMenuItem = page.getByText('Form Layouts')
        this.datepickerMenuItem = page.getByText('Datepicker')
        this.smartTableMenuItem = page.getByText('Smart Table')
        this.toastrMenuItem = page.getByText('Toastr')
        this.tooltipMenuItem = page.getByText('Tooltip')
    }

    async formLayoutsPage() { 
        await this.selectGroupMenuItem('Forms')
        await this.formLayoutsMenuItem.click()
        await this.waitForNumberOfSeconds(2)
    }

    async datepickerPage() { 
        await this.selectGroupMenuItem('Forms')
        await this.page.waitForTimeout(1000)
        await this.datepickerMenuItem.click()
    }
    async smartTablePage() { 
        await this.selectGroupMenuItem('Tables & Data')
        await this.smartTableMenuItem.click()   
        }
    async toastrPage() { 
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.toastrMenuItem.click()
    }
    async tooltipPage() { 
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.tooltipMenuItem.click()
    }

    private async selectGroupMenuItem(groupItemTitle: string) { 
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if (expandedState == "false")
            await groupMenuItem.click()
    }
}