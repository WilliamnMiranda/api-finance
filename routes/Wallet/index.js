const Router = require('express').Router()
const auth = require('../../utils/ValidateJwt')
const { 
    addValue,
} = require( '../../controllers/Wallet')

Router.patch('/add',auth,addValue)

module.exports = Router;