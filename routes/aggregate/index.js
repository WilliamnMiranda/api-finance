const Router = require('express').Router()
const auth = require('../../utils/ValidateJwt')
const {
  getCountTransactionsType,
  getByMonth,
  getTransactionByGroupDate,
  getByLastMonths
} = require('../../aggregations/transactions')

Router.get('/getbytype', auth, getCountTransactionsType)
Router.get('/getbydate/:mes', auth, getByMonth)
Router.get('/getbyday/', auth, getTransactionByGroupDate)
Router.get('/getByLastMonths', auth, getByLastMonths)
module.exports = Router;