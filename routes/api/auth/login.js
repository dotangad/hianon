const User = require('../../../models/User')
const jwt = require('../../../lib/jwt')
const bcrypt = require('bcrypt')
const Joi = require('joi')

module.exports = {
  schema: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string()
      .min(8)
      .max(32)
      .required()
  }),
  handler: async ctx => {
    try {
      const { email, password } = ctx.request.body

      // Check if account  exists
      const u = await User.findOne({ where: { email } })
      if (!u) {
        throw new Error(
          JSON.stringify({
            status: 404,
            message: 'Account does not exist'
          })
        )
      }

      // Compare password
      if (!(await bcrypt.compare(password, u.dataValues.password))) {
        throw new Error(
          JSON.stringify({
            status: 401,
            message: 'Incorrect password'
          })
        )
      }

      ctx.send(ctx, 200, true, `Logged in as ${u.dataValues.fullName}`, {
        token: await jwt.createToken(u.dataValues)
      })
    } catch (e) {
      try {
        const err = JSON.parse(e.message)
        ctx.throw(ctx, err.status, err.message, err.error)
      } catch (err) {
        ctx.throw(ctx, 500, e.message, e)
      }
    }
  }
}
