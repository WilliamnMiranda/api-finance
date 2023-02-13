const Router = require('express').Router()
const authenticate = require('../../utils/auth')
const { 
    register,
    login,
    auth
} = require( '../../controllers/User')

Router.post('/register',register)
Router.post('/login',login)
Router.post('/auth',authenticate,auth)
module.exports = Router;