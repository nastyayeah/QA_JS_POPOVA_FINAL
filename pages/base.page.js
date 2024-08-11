import dotenv from 'dotenv'
dotenv.config()

export default class PlaywrightDevPage {
  baseUrl = process.env.BASE_URL
    constructor(page) {
      this.page = page
    }
  
    async goToPage(pageURL) {
      await this.page.goto(pageURL)
    }
  }