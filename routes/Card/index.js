const Router = require('express').Router()
const auth = require('../../utils/ValidateJwt')
const {
    create,
    getAllCards,
} = require('../../controllers/Card')

Router.post('/create', auth, create)
Router.post('/getAll', auth, getAllCards)


module.exports = Router;