const Sequelize = require('sequelize')
const db = require('../lib/db')

module.exports = db.define('user', {
  username: { type: Sequelize.STRING, required: true },
  password: { type: Sequelize.STRING, required: true }
})
