/******** SETTINGS REQUIRE *********/
const path = require('path');

const express = require('express');
const cors = require('cors');
const { moduleExpression } = require('@babel/types');

/*** APP REQUIRE ***/
const level3Route = require('./routes/level3.route');
const { nextTick } = require('process');


/******* SETTINGS *******/
const app = express();


/** APP **/
// Laisser accéder le navigateur aux réponses du serveur via l'url donnée
app.use(cors({
  origin: "http://localhost:3000",
}));
// app.use((req, res, next) => {
//   console.log(req.method, 'puis', req.baseUrl, 'puis', req.url);
//   next();
// })

app.use(express.static(path.join(__dirname, 'public')));

// app.use('/?level=level3', level3Route);

app.get('/', (req, res) => {
  if(req.url === '/?level=level3'){
    // console.log(req.method, 'puis', req.baseUrl, 'puis', req.url);
    // res.sendFile(path.join(__dirname, 'public', 'level3', 'level3.html'))
    res.status(200).type('text/html').sendFile(path.join(__dirname, 'public', 'level3', 'level3.html'));
    // res.sendFile(path.join(__dirname, 'public', 'home', 'home.html'));

  }else{
    res.sendFile(path.join(__dirname, 'public', 'home', 'home.html'));
  }
});




module.exports = app;