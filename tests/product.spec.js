import { test, expect } from '@playwright/test'
import LoginPage from '../pages/login.page'
import HomePage from '../pages/home.page'
import ProductPage from '../pages/product.page'
import HeaderComponent from '../pages/components/header.component'
import { itemsNamesDict } from '../fixtures/items-names'

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.goToPage(loginPage.loginPageUrl)
  await loginPage.loginUser(process.env.TEST_VALID_USERNAME, process.env.TEST_PASSWORD)
})

test('Should add to cart item on Product page', async ({ page }) => {
  const homePage = new HomePage(page)
  const productPage = new ProductPage(page)
  const headerComponent = new HeaderComponent(page)
  await homePage.clickOnProduct(itemsNamesDict.backpack)
  await expect(page).toHaveURL(productPage.productPageUrl + '?id=4')
  await productPage.addToCartItem()
  await expect(page.locator(headerComponent.cartBadge)).toHaveText('1')
})

test('Should remove item from cart on Product page', async ({ page }) => {
  const homePage = new HomePage(page)
  const productPage = new ProductPage(page)
  const headerComponent = new HeaderComponent(page)
  await homePage.clickOnProduct(itemsNamesDict.backpack)
  await expect(page).toHaveURL(productPage.productPageUrl + '?id=4')
  await productPage.addToCartItem()
  expect(await headerComponent.getCartBadgeCount()).toBe('1')
  await productPage.removeFromCartItem()
  await expect(headerComponent.getCartBadge()).toHaveCount(0)
}
)