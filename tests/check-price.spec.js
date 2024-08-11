import { test, expect } from '@playwright/test'
import LoginPage from '../pages/login.page'
import HomePage from '../pages/home.page'
import ProductPage from '../pages/product.page'
import CartPage from '../pages/cart.page'
import { itemsNamesDict } from '../fixtures/items-names'

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page)

  await loginPage.goToPage(loginPage.loginPageUrl)
  await loginPage.loginUser(process.env.TEST_VALID_USERNAME, process.env.TEST_PASSWORD)
})

test('should check item price on home, product and cart pages', async ({ page }) => {
  const homePage = new HomePage(page)
  const cartPage = new CartPage(page)
  const productPage = new ProductPage(page)

  const homeBackpackPrice = await homePage.getItemPrice(itemsNamesDict.backpack)
  await homePage.clickOnProduct(itemsNamesDict.backpack)
  const productBackpackPrice = await productPage.getItemPrice()
  await productPage.addToCartItem()
  await productPage.clickOnCart()
  const cartBackpackPrice = await cartPage.getItemPrice(itemsNamesDict.backpack)
  expect(homeBackpackPrice).toEqual('$29.99')
  expect(productBackpackPrice).toEqual('$29.99')
  expect(cartBackpackPrice).toEqual('$29.99')
})