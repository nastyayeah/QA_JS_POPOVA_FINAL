import { test, expect } from '@playwright/test'
import LoginPage from '../pages/login.page'
import HomePage from '../pages/home.page';
import dotenv from 'dotenv';
dotenv.config();

test('should login standart user', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const homePage = new HomePage(page)
  await loginPage.goToPage(loginPage.baseUrl)
  await loginPage.loginUser(process.env.TEST_VALID_USERNAME, process.env.TEST_PASSWORD)
  await expect(page).toHaveURL(homePage.homePageUrl)
})

test('should login invalid user', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.goToPage(loginPage.loginPageUrl)
  await loginPage.loginUser(process.env.TEST_LOCKED_USERNAME, process.env.TEST_PASSWORD)
  await expect(page).toHaveURL(loginPage.loginPageUrl)
  await expect(page.locator(loginPage.errorMessage)).toHaveText(
    'Epic sadface: Sorry, this user has been locked out.',
  )
})
