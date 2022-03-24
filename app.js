/******** SETTINGS REQUIRE *********/
const path = require('path');

const express = require('express');
const cors = require('cors');
const { moduleExpression } = require('@babel/types');



/******* SETTINGS *******/
const app = express();


/** APP **/
// Laisser accéder le navigateur aux réponses du serveur via l'url donnée
app.use(cors({
  origin: "http://localhost:3000",
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'home', 'home.html'));
});

module.exports = app;