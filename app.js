/******** SETTINGS REQUIRE *********/
const path = require('path');

const express = require('express');
const cors = require('cors');
const { moduleExpression } = require('@babel/types');

/*** APP REQUIRE ***/
const level3Route = require('./routes/level3.route');
const { nextTick } = require('process');
const config = require('./config')


/******* SETTINGS *******/
const app = express();


/** APP **/
// Laisser accéder le navigateur aux réponses du serveur via l'url donnée
app.use(cors({
  origin: "https://neiyad-jeu-de-memory.herokuapp.com/",
  // origin: "http://localhost:3000",
}));

app.use(express.static(path.join(__dirname, 'public')));

let withChrono = '';

app.get('/', (req, res) => {
  console.log(req.url)
  withChrono = req.url.split('&')[1];

  if(req.url.split('&')[0] === '/?level=level3'){
    res.status(200).type('text/html').sendFile(path.join(__dirname, 'public', 'level3', 'level3.html'));
  }else{
    res.sendFile(path.join(__dirname, 'public', 'home', 'home.html'));
  };
});



module.exports = {
  app,
  withChrono,
};