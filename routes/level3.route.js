/**** SETTINGS REQUIRE ****/
const express = require('express');
const app = require('../app');

/**** APP REQUIRE ****/
const level3Controller = require('../controllers/level3.controller');


/*** ROUTE ***/
const level3Route = express.Router();

level3Route.get('/', level3Controller.getPage);

module.exports = level3Route;