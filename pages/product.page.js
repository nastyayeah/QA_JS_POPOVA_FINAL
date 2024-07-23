import PlaywrightDevPage from './base.page'

export default class ProductPage extends PlaywrightDevPage {
  constructor(page) {
    super(page)
    this.itemName = `[data-test="inventory-item-name"]`
    this.itemPrice = `[data-test="inventory-item-price"]`
    this.addToCartItemBtn = '#add-to-cart'
    this.removeFromCartItemBtn = '#remove'
    this.cartBadge = '.shopping_cart_badge'
      this.cartButton = '.shopping_cart_link'
  }

  async addToCartItem() {
    await this.page.click(this.addToCartItemBtn)
  }

  async removeFromCartItem() {
    await this.page.click(this.removeFromCartItemBtn)
  }

  async getPrice(){
   return await this.page.locator(this.itemPrice).textContent()
}

async moveToCart(){
    await this.page.locator(this.cartButton).click()
}
}
