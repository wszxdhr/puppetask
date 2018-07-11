import puppeteer from 'puppeteer'
import config from '../../config/index'

export default {
  timer: null,
  wsEndpoint: null,
  async create () { // 创建chrome，设置timer
    this.browser = await puppeteer.launch()
    if (this.browser) {
      this.wsEndpoint = this.browser.wsEndpoint()
      console.log(`Chrome created successful. wsEndPoint: ${this.wsEndpoint}`)
      // this.resetTimer()
    } else {
      console.error('Chrome created failed.')
    }
  },
  resetTimer () { // 重置Timer
    if (this.timer !== null) {
      clearTimeout(this.timer)
    }
    this.timer = setTimeout(() => {
      console.log(`Chrome closed, current timeout: ${config.chromeRelaunchTimeout}ms. `)
      this.closeBrowser()
      this.timer = null
    }, config.chromeRelaunchTimeout)
  },
  closeBrowser () {
    if (this.browser) {
      this.browser.close()
    }
  },
  getEndpoint () {
    return this.wsEndpoint
  },
  async getBrowser () { // 获取browser对象
    if (!this.browser) {
      await this.create()
    }
    return this.browser
  }
}
