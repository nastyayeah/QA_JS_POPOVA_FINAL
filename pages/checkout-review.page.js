import PlaywrightDevPage from "./base.page";

export default class CheckoutReview extends PlaywrightDevPage {

    constructor(page) {
        super(page)
        this.checkoutReviewPageUrl = this.baseUrl + '/checkout-step-two.html'

        this.finishButton = '#finish'
        this.itemText = (itemName) => `//div[text()='${itemName}']`
    }

    async completeCheckoutReview() {
        await this.page.locator(this.finishButton).click()
    }

    getItemByName(itemName) {
        return this.page.locator(this.itemText(itemName))
    }

}