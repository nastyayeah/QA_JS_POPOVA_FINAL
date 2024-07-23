import { test, expect } from '@playwright/test'
import LoginPage from '../pages/login.page'
import HomePage from '../pages/home.page'
import ProductPage from '../pages/product.page'
import CartPage from '../pages/cart.page'

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.goToPage('https://www.saucedemo.com/')
  await loginPage.loginUser('standard_user', 'secret_sauce')
})

test('Check item price', async({page}) => {
    const homePage = new HomePage(page)
    const cartPage = new CartPage(page)
    const productPage = new ProductPage(page)
    const homeBackpackPrice = await homePage.getPrice()
    await homePage.clickOnItem('backpack')
    const productBackpackPrice = await productPage.getPrice()
    await productPage.addToCartItem()
    await productPage.moveToCart()
    const cartBackpackPrice = await cartPage.getPrice()
    expect (homeBackpackPrice).toEqual('$29.99')
    expect (productBackpackPrice).toEqual('$29.99')
    expect (cartBackpackPrice).toEqual('$29.99')
})