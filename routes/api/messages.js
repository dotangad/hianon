const Router = require('koa-router')
const Joi = require('joi')
const Message = require('../../models/Message')
const jwt = require('../../lib/jwt')
const { validateAgainst } = require('../../lib/validation')
const rtr = new Router()

rtr.get('/', jwt.verifyToken, async ctx =>
  ctx.send(ctx, 200, true, 'Messages in res.messages', {
    messages: await Message.findAll()
  })
)

rtr.post(
  '/',
  async (ctx, next) => {
    console.log('asdsad')
    console.log(ctx.request.body)
    await next()
  },
  validateAgainst(
    Joi.object().keys({
      message: Joi.string().required(),
      nickname: Joi.string()
    })
  ),
  async ctx => {
    try {
      const msg = await Message.create(ctx.request.body)

      ctx.send(ctx, 200, true, 'Message saved', { msg: msg.dataValues })
    } catch (e) {
      try {
        const err = JSON.parse(e.message)
        ctx.throw(ctx, err.status, err.message, err.error)
      } catch (err) {
        ctx.throw(ctx, 500, e.message, e)
      }
    }
  }
)

module.exports = rtr
