const EventController = require('../controllers/event.controller')
const {authenticate} = require("../config/jwt.config")

const routes = (app)=>{

    app.post('/api/v1/events', authenticate, EventController.create)

    app.get('/api/v1/events', EventController.getAll)

    app.get('/api/v1/events/:id', EventController.getOne)

    app.put('/api/v1/events/:id', EventController.update)

    app.delete('/api/v1/events/:id', EventController.delete)

    app.get('/api/v1/eventsbyuser/:username', authenticate, EventController.findAllEventsByUser)

}

module.exports = routes