const Router = require('koa-router')
const apiRoutes = require('./api')
const rtr = new Router()

// Mount API routes
rtr.use('/api', apiRoutes.routes(), apiRoutes.allowedMethods())

// Handle 404s
rtr.all('*', async ctx => ctx.throw(ctx, 404, 'Resource not found'))

module.exports = rtr
