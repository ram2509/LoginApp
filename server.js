var express = require('express');
var passport = require('passport');
var path = require('path');
var handlebars = require('handlebars');
var flash = require('connect-flash');
var passportLocal = require('passport-local');
var localStrategy = passportLocal.Strategy;
var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');
var session = require('express-session');
//var database = require('./models/database');
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

app.configure(function() {
    app.use(express.cookieParser('keyboard cat'));
    app.use(express.session({ cookie: { maxAge: 60000 }}));
    app.use(flash());
});

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

//connect flash


//Global Variables
app.use(function (req,res,next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});



// app.post('/users/register',function (req,res) {
//     database.insertItem(req.body.username , function(data) {
//         console.log(data);
//         res.send(data);
//     })
// });

// app.get('/users/find',function (req,res) {
//     database.findTodo(function (data) {
//         res.send(data);
//     })
// })

app.listen(port,function (err,data) {
    console.log('Server are created');
});
