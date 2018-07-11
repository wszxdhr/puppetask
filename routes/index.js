import chrome from '../modules/puppeteer'
import status from '../modules/status'
const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  console.log('get /', await chrome.getBrowser())
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/status', async (ctx, next) => {
  ctx.body = await status.getSystemStatus()
})

module.exports = router
