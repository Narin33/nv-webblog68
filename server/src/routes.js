const UserController = require('./controllers/UserController')
const UserAuthenController = require('./controllers/UserAuthenController')

module.exports = (app) => {
    // User Management
    app.get('/users', UserController.index)
    app.post('/user', UserController.create)
    app.put('/user/:userId', UserController.put)
    app.delete('/user/:userId', UserController.remove)
    app.get('/user/:userId', UserController.show)

    // Authentication (Login/Register)
    app.post('/login', UserAuthenController.login)
    app.post('/register', UserAuthenController.register)
}