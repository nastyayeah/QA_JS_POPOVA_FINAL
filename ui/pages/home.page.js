import { it } from 'node:test'
import PlaywrightDevPage from './base.page'
import HeaderComponent from './components/header.component'

export default class HomePage extends PlaywrightDevPage {
  constructor(page) {
    super(page)
    this.header = new HeaderComponent(page)
    this.homePageUrl = this.baseUrl + '/inventory.html'

    // this.addToCartBackpackBtn = '#add-to-cart-sauce-labs-backpack'
    // this.addToCartBikeLightBtn = '#add-to-cart-sauce-labs-bike-light'
    // this.addToCartTShirtBtn = '#add-to-cart-sauce-labs-bolt-t-shirt'
    // this.removeFromCartBackpackBtn = '#remove-sauce-labs-backpack'
    // this.removeFromCartBikeLightBtn = '#remove-sauce-labs-bike-light'
    // this.removeFromCartTShirtBtn = '#remove-sauce-labs-bolt-t-shirt'
    // this.cartBadge = '.shopping_cart_badge'
    // this.backpackLink = '#item_4_title_link'
    // this.bikeLightLink = '#item_0_title_link'
    // this.tShirtLink = '#item_1_title_link'
    // this.backpackPrice = `//div[text()='29.99']`



    this.addToCartItemButton = (itemName) => `#add-to-cart-${itemName.toLowerCase().split(' ').join('-')}`
    this.removeFromCartItemButton = (itemName) => `#remove-${itemName.toLowerCase().split(' ').join('-')}`
    this.itemLink = (itemName) => `//div[text()='${itemName}']/ancestor-or-self::a`
    this.itemPrice = (itemName) => `//div[text()='${itemName}']/ancestor::div[@class="inventory_item"]//div[@class="inventory_item_price"]`

  }

  async clickOnProduct(itemName) {

    await this.page.locator(this.itemLink(itemName)).click()
  }

  async addToCartItem(itemName) {
    await this.page.locator(this.addToCartItemButton(itemName)).click()
  }

  async removeFromCartItem(itemName) {
    await this.page.locator(this.removeFromCartItemButton(itemName)).click()
  }

  async clickOnCart() {
    this.header.clickOnCart()
  }

  async getItemPrice(itemName) {
    return await this.page.locator(this.itemPrice(itemName)).textContent()
  }

  getRemoveFromCartButton(itemName) {
    return this.page.locator(this.removeFromCartItemButton(itemName))
  }
}