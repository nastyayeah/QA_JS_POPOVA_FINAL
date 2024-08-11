import PlaywrightDevPage from './base.page'
import HeaderComponent from './components/header.component'

export default class ProductPage extends PlaywrightDevPage {
  constructor(page) {
    super(page)
    this.productPageUrl = this.baseUrl + '/inventory-item.html'
    this.headerComponent = new HeaderComponent(page)

    this.itemName = `[data-test="inventory-item-name"]`
    this.itemPrice = `[data-test="inventory-item-price"]`
    this.addToCartButton = '#add-to-cart'
    this.removeFromCartButton = '#remove'
  }

  async addToCartItem() {
    await this.page.locator(this.addToCartButton).click()
  }

  async removeFromCartItem() {
    await this.page.locator(this.removeFromCartButton).click()
  }

  async getItemPrice() {
    return await this.page.locator(this.itemPrice).textContent()
  }

  async clickOnCart() {
    await this.headerComponent.clickOnCart()
  }
}
