export default class HeaderComponent {
    constructor(page) {
        this.page = page

        this.burgerMenu = '#react-burger-menu-btn'
        this.cartIcon = '.shopping_cart_link'
        this.appLogo = '.app_logo'
        this.cartBadge = '.shopping_cart_badge'
    }

    async clickOnCart() {
        await this.page.locator(this.cartIcon).click()
    }

    async getCartBadgeCount() {
        return await this.page.locator(this.cartBadge).textContent()
    }

    getCartBadge() {
        return this.page.locator(this.cartBadge)
    }
} 