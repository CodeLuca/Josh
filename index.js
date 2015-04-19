var express = require('express')
var bodyParser = require('body-parser');
var app = express()
var mongojs = require('mongojs');
var expressHbs = require('express-handlebars');
var db = mongojs('mongodb://localhost:27017/blog', ['posts']);
var session = require('express-session')

app.use(express.static(__dirname + '/views'));
app.engine('hbs', expressHbs({extname:'hbs', defaultLayout:'main.hbs'}));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({secret: '1234567890QWERTY'}));

require('./server_js/blog')(app, db);

app.get('/', function(req, res){
  res.render('index');
}); 

app.listen(3000);
