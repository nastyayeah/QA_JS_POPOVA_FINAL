import PlaywrightDevPage from './base.page'

export default class CartPage extends PlaywrightDevPage {
  constructor(page) {
    super(page)
    this.cartPageUrl = this.baseUrl + '/cart.html'

    this.itemLink = (itemName) => `//div[text()='${itemName}']/ancestor-or-self::a`
    this.removeFromCartItemButton = (itemName) => `#remove-from-cart-${itemName.toLowerCase().split(' ').join('-')}`
    this.itemPrice = (itemName) => `//div[text()='${itemName}']/ancestor::div[@class="cart_item"]//div[@class="inventory_item_price"]`
    this.cartItemsList = '.cart_item'
    this.checkoutButton = '#checkout'
  }

  async goToCheckoutPage() {
    await this.page.locator(this.checkoutButton).click()
  }

  async getItemPrice(itemName) {
    return await this.page.locator(this.itemPrice(itemName)).textContent()
  }

  getItems() {
    const itemsList = this.page.locator(this.cartItemsList)
    return itemsList
  }

  getItemLink(itemName) {
    return this.page.locator(this.itemLink(itemName))
  }
}