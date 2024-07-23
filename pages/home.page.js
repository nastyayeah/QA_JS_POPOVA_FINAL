import { it } from 'node:test'
import PlaywrightDevPage from './base.page'

export default class HomePage extends PlaywrightDevPage {
  constructor(page) {
    super(page)
    this.addToCartBackpackBtn = '#add-to-cart-sauce-labs-backpack'
    this.addToCartBikeLightBtn = '#add-to-cart-sauce-labs-bike-light'
    this.addToCartTShirtBtn = '#add-to-cart-sauce-labs-bolt-t-shirt'
    this.removeFromCartBackpackBtn = '#remove-sauce-labs-backpack'
    this.removeFromCartBikeLightBtn = '#remove-sauce-labs-bike-light'
    this.removeFromCartTShirtBtn = '#remove-sauce-labs-bolt-t-shirt'
    this.cartButton = '.shopping_cart_link'
    this.cartBadge = '.shopping_cart_badge'
    this.backpackLink = '#item_4_title_link'
    this.bikeLightLink = '#item_0_title_link'
    this.tShirtLink = '#item_1_title_link'
    this.backpackPrice = `//div[text()='29.99']`
  }

  createAddToCartDict() {
    return {
      backpack: this.addToCartBackpackBtn,
      'bike-light': this.addToCartBikeLightBtn,
      't-shirt': this.addToCartTShirtBtn,
    }
  }

  createRemoveFromCartDict() {
    return {
      backpack: this.removeFromCartBackpackBtn,
      'bike-light': this.removeFromCartBikeLightBtn,
      't-shirt': this.removeFromCartTShirtBtn,
    }
  }
  
  createItemsDict() {
    return {
      backpack: this.backpackLink,
      'bike-light': this.bikeLightLink,
      't-shirt': this.tShirtLink,
    }
  }
  async clickOnItem(itemName){
    const itemsDict = this.createItemsDict()
    await this.page.click(itemsDict[itemName])
  }

  async addToCartItem(itemName) {
    const addToCartDict = this.createAddToCartDict()
    await this.page.click(addToCartDict[itemName])
  }

  async removeFromCartItem(itemName) {
    const removeFromCartDict = this.createRemoveFromCartDict()
    await this.page.click(removeFromCartDict[itemName])
  }

  async clickCart() {
    await this.page.click(this.cartButton)
  }

  async getPrice(){  
    return await this.page.locator(this.backpackPrice).textContent()
  }
}