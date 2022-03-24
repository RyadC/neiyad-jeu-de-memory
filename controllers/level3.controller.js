const res = require("express/lib/response");
const path = require('path');

function getPage(req, res) {
  res.status(200).type('html').sendFile(path.join(__dirname, '..', 'public', 'level3', 'level3.html'));
};

module.exports = {
  getPage,
}