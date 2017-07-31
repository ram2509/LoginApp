var router = require('express').Router();
var expressValidator = require('express-validator');
var flash = require('connect-flash');
router.use(expressValidator());
//var database = require('../models/database');
var user = require('../models/db');
router.get('/login',function (req,res) {
    res.render('login');
})

router.get('/register',function (req,res) {
    res.render('register');
})

router.post('/register',function (req,res) {
    var name = req.body.name;
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var password2 =  req.body.password2;
   // console.log(name);
    //console.log(username);

    req.checkBody('name','Name are required').notEmpty();
    req.checkBody('username','Username are required').notEmpty();
    req.checkBody('email','Email_Id are required').notEmpty();
    req.checkBody('password','Password are required').notEmpty();
    req.checkBody('password2','Confirm-password are not match').equals(req.body.password);

    var errors = req.getValidationResult();

    if(errors){
        res.render('register',{errors : errors});
    }

    else {
        var newUser = new user({
            name : name,
            username : username,
            email : email,
            password : password,
        });

        user.createUser(newUser,function (err,user) {
            if(err) throw err;
            console.log(user);
        });
    }

    req.flash('success_msg','You are register can now login');


})

module.exports = router;