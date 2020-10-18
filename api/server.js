const express = require('express');
const helmet = require('helmet');

//routes
const usersRoute = require('./users/users-route')
const classesRoute = require('./classes/classes-route')
const reservationsRoute = require('./reservations/reservations-route')

const server = express();
server.use(helmet());
server.use(express.json());

server.use('/api/users', usersRoute);
server.use('/api/classes', classesRoute);
server.use('/api/reservations', reservationsRoute);

//Sanity Check
server.get("/", (req, res) => {
    res.status(200).json({api: "running" });
})

module.exports = server;