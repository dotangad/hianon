const Router = require('koa-router')
const { validateAgainst } = require('../../../lib/validation')
const loginHandler = require('./login')
const rtr = new Router()

rtr.all('/', async ctx => {
  ctx.send(ctx, 200, true, 'koa-hackathon-starter auth')
})

rtr.post('/login', validateAgainst(loginHandler.schema), loginHandler.handler)

module.exports = rtr
