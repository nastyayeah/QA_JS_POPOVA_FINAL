import { test, expect } from '@playwright/test'
import LoginPage from '../pages/login.page'
import HomePage from '../pages/home.page'
import CheckoutPage from '../pages/checkout.page'
import CartPage from '../pages/cart.page'
import HeaderComponent from '../pages/components/header.component'
import { itemsNamesDict } from '../fixtures/items-names'
import CheckoutReview from '../pages/checkout-review.page'
import dotenv from 'dotenv'
import CheckoutCompletePage from '../pages/checkout-complete.page'
dotenv.config()

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page)
  const homePage = new HomePage(page)
  const headerComponent = new HeaderComponent(page)
  await loginPage.goToPage(loginPage.loginPageUrl)
  await loginPage.loginUser(process.env.TEST_VALID_USERNAME, process.env.TEST_PASSWORD)
  await homePage.addToCartItem(itemsNamesDict.bike)
  await headerComponent.clickOnCart()
})

test('should checkout user from the Cart page', async ({ page }) => {
  const checkoutPage = new CheckoutPage(page)
  const cartPage = new CartPage(page)
  const checkoutReviewPage = new CheckoutReview(page)
  const checkoutCompltePage = new CheckoutCompletePage

  await expect(cartPage.getItems()).toHaveCount(1)

  await cartPage.goToCheckoutPage()
  await expect(page).toHaveURL(
    checkoutPage.checkoutPageUrl,
  )

  await checkoutPage.checkoutUser(process.env.TEST_USER, process.env.TEST_LAST_NAME, process.env.TEST_ZIP_CODE)
  await expect(page).toHaveURL(checkoutReviewPage.checkoutReviewPageUrl)

  await expect(checkoutReviewPage.getItemByName(itemsNamesDict.bike)).toBeVisible()
  await checkoutReviewPage.completeCheckoutReview()
  await expect(page).toHaveURL(checkoutCompltePage.checkoutCompletePageUrl)
})