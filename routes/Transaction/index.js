const Router = require('express').Router()
const auth = require('../../utils/ValidateJwt')
const {
    create,
    get,
    getOne,
    deleteDeposit,
    getByType,
    getLast,
    getByTypeAndCurrentMonth,
} = require('../../controllers/Transaction')

Router.post('/create', auth, create)
Router.get('/', auth, get)
Router.get('/:id', auth, getOne)
Router.delete('/:id', auth, deleteDeposit)
Router.post('/getalltype', auth, getByType)
Router.post('/last', auth, getLast)
Router.get('/getbytype/currentmonth', auth, getByTypeAndCurrentMonth)
module.exports = Router;