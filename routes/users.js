var router = require('express').Router();
var expressValidator = require('express-validator');
router.use(expressValidator());

var pathName = 'not_secure';
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
    console.log(name);
    console.log(username);

    req.checkBody('name','Name are required').notEmpty();
    req.checkBody('username','Username are required').notEmpty();
    req.checkBody('email','Email_Id are required').notEmpty();
    req.checkBody('password','Password are required').notEmpty();
    req.checkBody('password2','Confirm-password are not match').equals(req.body.password);

    var errors = req.validationErrors();

    if(errors){
        res.render('register',{errors : errors});
    }

    else {
        console.log('Done');
    }


})

module.exports = router;