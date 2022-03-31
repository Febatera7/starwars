const { Router } = require('express');
const Users = require('../controllers/Users');
const Session = require('../controllers/Sessions');
const StarWars = require('../controllers/StarWars');
const routes = Router();
const authMiddleware = require('../middlewares/auth');

//Users Routes
routes.post('/users', Users.create);
routes.get('/users', authMiddleware, Users.read);
routes.patch('/users', authMiddleware, Users.update);
routes.delete('/users', authMiddleware, Users.delete);

//Session Routes
routes.post('/signin', Session.create);

//Star Wars Routes
routes.post('/getAllFromSpecificTheme', authMiddleware, StarWars.getAllFromSpecificTheme);
routes.post('/getOne', authMiddleware, StarWars.getOne);

module.exports = routes;
