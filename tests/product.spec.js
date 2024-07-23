import { test, expect } from '@playwright/test'
import LoginPage from '../pages/login.page'
import HomePage from '../pages/home.page'
import ProductPage from '../pages/product.page'

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.goToPage('https://www.saucedemo.com/')
  await loginPage.loginUser('standard_user', 'secret_sauce')
})

test('Should add to cart item on Product page', async({page}) => {
    const homePage = new HomePage(page)
    const productPage = new ProductPage(page)
    await homePage.clickOnItem('backpack')
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=4')
    await productPage.addToCartItem()
    await expect(page.locator(productPage.cartBadge)).toHaveText('1')
})

test('Should remove item from cart on Product page', async ({page}) =>{
    const homePage = new HomePage(page)
    const productPage = new ProductPage(page)
    await homePage.clickOnItem('backpack')
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=4')
    await productPage.addToCartItem()
    await expect(page.locator(productPage.cartBadge)).toHaveText('1')
    await productPage.removeFromCartItem()
    await expect(page.locator(productPage.cartBadge)).toHaveCount(0)
}
)