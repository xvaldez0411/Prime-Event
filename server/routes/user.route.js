const UserController = require('../controllers/user.controller')
const {authenticate} = require("../config/jwt.config")

const routes = (app)=>{

    app.post('/api/v1/users/register', UserController.register)
    app.post('/api/v1/users/login', UserController.login)
    app.post('/api/v1/users/logout', UserController.logout)
    app.get('/api/v1/users', authenticate, UserController.getLoggedInUser)
}

module.exports = routes