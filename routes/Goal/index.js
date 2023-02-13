const Router = require('express').Router()
const auth = require('../../utils/ValidateJwt')
const {
    create,
    get,
    getOne,
    deleteGoal,
    update
} = require('../../controllers/Goal')

Router.post('/create', auth, create)
Router.get('/', auth, get)
Router.get('/:id', auth, getOne)
Router.delete('/:id', auth, deleteGoal)
Router.patch('/update/:id', auth, update)
module.exports = Router;