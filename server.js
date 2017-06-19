var app = require('./express');
//var app = express();

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport = require('passport');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({ secret: "put some text here" })); //later transfer this to env param
app.use(passport.initialize());
app.use(passport.session());

// configure a public directory to host static content
app.use(app.express.static(__dirname + '/public'));

require ("./test/app.js")(app);
var blog = require('./lectures/angular/app');
blog(app)

require('./assignment/app')
var port = process.env.PORT || 3000;

app.listen(port);