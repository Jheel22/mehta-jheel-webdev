/*var mongoose = require('mongoose');
 mongoose.createConnection('mongodb://localhost/test');*/
var connectionString = 'mongodb://localhost/test'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds137291.mlab.com:37291/heroku_x8rc58vn'; // user yours
}


var mongoose = require("mongoose");
mongoose.createConnection(connectionString);
mongoose.Promise = require('q').Promise;

require('./services/user.service.server');
require('./services/website.service.server');
require('./services/page.service.server');
require('./services/widget.service.server');