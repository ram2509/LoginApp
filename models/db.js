var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost/loginapp');

var db = mongoose.connection;

//create user schema
var userSchema = mongoose.Schema({
        name : {type: String},
        username : {type : String, index : true},
        email : {type : String},
        password : {type : String}
});

function createUser(newUser,callback) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

//var User = mongoose.model('user',userSchema);
 module.exports = mongoose.model('user',userSchema);

module.exports = {
    createUser
}