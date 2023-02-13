const Router = require('express').Router()
const auth = require('../../utils/ValidateJwt')
const {
  create,
  getAll
} = require('../../controllers/GoalGroup')

Router.post('/', auth, create)
Router.get('/getAll', auth, getAll)
module.exports = Router;