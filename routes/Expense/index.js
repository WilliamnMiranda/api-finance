const Router = require('express').Router()
const auth = require('../../utils/ValidateJwt')
const { 
    create,
    get,
    getOne,
    deleteExpense
} = require( '../../controllers/Expense')

Router.post('/create',auth,create)
Router.get('/',auth,get)
Router.get('/:id',auth,getOne)
Router.delete('/:id',auth,deleteExpense)

module.exports = Router;