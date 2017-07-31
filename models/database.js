var mongodb = require('mongodb');

var url = "mongodb://localhost:27017/loginApp";

var obj = '';

function connectDb(run_server) {


    mongodb.MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        console.log('Connection are established');
        obj = db;
        run_server();
    });

}

function findTodo(callback) {
    obj.collection('register').find({}).toArray(function(err,data) {
        callback(data);
    })
}

function insertItem(task,callback) {
    obj.collection('register').insertOne({task},function (err, result) {
        if(err) throw err;
        console.log(result);
        callback(result);
    })
}

module.exports = {
    insertItem,
    connectDb,
    findTodo
}