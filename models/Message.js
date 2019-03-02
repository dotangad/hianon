const Sequelize = require('sequelize')
const db = require('../lib/db')

module.exports = db.define('message', {
  message: { type: Sequelize.STRING, required: true },
  nickname: { type: Sequelize.STRING, required: false },
  responded: { type: Sequelize.BOOLEAN, defaultValue: false }
})
