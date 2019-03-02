const jwt = require('jsonwebtoken')
const secret =
  process.env.JWT_SECRET ||
  require('crypto')
    .randomBytes(25)
    .toString('hex')
const config = {
  issuer: process.env.JWT_ISS || 'koa-hackathon-starter',
  subject: process.env.JWT_SUB || 'khs-auth',
  audience: process.env.JWT_AUD || 'khs-user'
}

module.exports = {
  createToken: payload => {
    try {
      return jwt.sign(payload, secret, {
        expiresIn: '18h',
        ...config
      })
    } catch (error) {
      console.log(error)
      return null
    }
  },
  verifyToken: async (ctx, next) => {
    ctx.state.token = ctx.get('Authorization').split(' ')[1]
    if (!ctx.state.token) {
      ctx.throw(ctx, 401, 'Missing token')
      return
    }

    try {
      ctx.state.tokenPayload = jwt.verify(ctx.state.token, secret, {
        ...config,
        clockTolerance: 30
      })
    } catch (error) {
      console.log(error)
      ctx.throw(ctx, 401, 'JWT Error')
      return
    }

    await next()
  }
}
