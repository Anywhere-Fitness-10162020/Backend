const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config()

//routes
const usersRoute = require('./users/users-route')
const classesRoute = require('./classes/classes-route')
const authenticationRouter = require('./auth/authenticationRouter')
const reservationsRoute = require('./reservations/reservations-route')
const passesRoute = require('./passes/passes-route')
const punchesRoute = require('./punches/punches-route')


const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/users', usersRoute);
server.use('/api/classes', classesRoute);
server.use('/api/reservations', reservationsRoute)
server.use('api/passes', passesRoute)
server.use('api/punches', punchesRoute)
server.use('/api/auth', authenticationRouter)

//Sanity Check
server.get("/", (req, res) => {
    res.status(200).json({api: "running" });
})

module.exports = server;