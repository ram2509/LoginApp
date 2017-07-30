var express = require('express');
var passport = require('passport');
var path = require('path');
var handlebars = require('handlebars');
var passportLocal = require('passport-local');
var localStrategy = passportLocal.Strategy;
var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');
var session = require('express-session');
//var mongodb = require('mongodb');
//var config = require('./config');
var port = 5000 || process.env.PORT;
var app = express();

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//view engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'hbs');

var route = {
    index : require('./routes/index'),
    users : require('./routes/users')
}

app.use('/',route.index);
app.use('/users',route.users);

// In this example, the formParam value is going to get morphed into form body format useful for printing.
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));



app.listen(port,function () {
    console.log('Server is running on the port ' + port);
})

