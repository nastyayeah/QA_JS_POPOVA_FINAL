import { test, expect } from '@playwright/test'
import LoginPage from '../pages/login.page'
import HomePage from '../pages/home.page'
import CartPage from '../pages/cart.page'
import HeaderComponent from '../pages/components/header.component'
import { itemsNamesDict } from '../fixtures/items-names'

import dotenv from 'dotenv'
dotenv.config()

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.goToPage(loginPage.loginPageUrl)
  await loginPage.loginUser(process.env.TEST_VALID_USERNAME, process.env.TEST_PASSWORD)
})

test('should add to cart 1 item', async ({ page }) => {
  const homePage = new HomePage(page)
  const cartPage = new CartPage(page)
  const headerComponent = new HeaderComponent(page)
  await homePage.addToCartItem(itemsNamesDict.backpack)
  expect(await headerComponent.getCartBadgeCount()).toBe('1')
  await expect(homePage.getRemoveFromCartButton(itemsNamesDict.backpack)).toBeVisible()

  await homePage.clickOnCart()
  await expect(page).toHaveURL(cartPage.cartPageUrl)
  await expect(cartPage.getItemLink(itemsNamesDict.backpack)).toBeVisible()
})

test('should add to cart more than 2 items', async ({ page }) => {
  const homePage = new HomePage(page)
  const cartPage = new CartPage(page)
  const headerComponent = new HeaderComponent(page)


  await homePage.addToCartItem(itemsNamesDict.backpack)
  await homePage.addToCartItem(itemsNamesDict.bike)
  await homePage.addToCartItem(itemsNamesDict.tShirt)
  expect(await headerComponent.getCartBadgeCount()).toBe('3')

  await homePage.clickOnCart()
  await expect(page).toHaveURL(cartPage.cartPageUrl)
  await expect(cartPage.getItems()).toHaveCount(3)
  await expect(cartPage.getItemLink(itemsNamesDict.backpack)).toBeVisible()
  await expect(cartPage.getItemLink(itemsNamesDict.bike)).toBeVisible()
  await expect(cartPage.getItemLink(itemsNamesDict.tShirt)).toBeVisible()

})