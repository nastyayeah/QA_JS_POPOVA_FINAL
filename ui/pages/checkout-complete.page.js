import PlaywrightDevPage from "./base.page";

export default class CheckoutCompletePage extends PlaywrightDevPage{
    constructor(page){
        super(page)
        this.checkoutCompletePageUrl = this.baseUrl + '/checkout-complete.html'
        this.completeCheckoutTitle = '.title'
        this.completeHeader = '.complete-header'
        this.backHomeButton = '#back-to-products'
    }

    async completeCheckout(){
        await this.page.locator(this.completeCheckout).toBeVisible()
        await this.page.locator(this.completeHeader).toBeVisible()
        await this.page.locator(this.backHomeButton).click()
    }
}