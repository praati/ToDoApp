var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes/index');

var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.use('/', routes);
var port = 3000;
app.listen(port);
console.log(port);
module.exports = app;
