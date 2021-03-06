const Router = require('koa-router')
const authRoutes = require('./auth')
const messagesRoutes = require('./messages')
const rtr = new Router()

rtr.use('/auth', authRoutes.routes(), authRoutes.allowedMethods())
rtr.use('/messages', messagesRoutes.routes(), messagesRoutes.allowedMethods())

rtr.get('/', async ctx =>
  ctx.send(ctx, 200, true, 'Welcome to koa-hackathon-starter API!')
)

module.exports = rtr
