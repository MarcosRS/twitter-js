var express = require('express');
var router = express.Router();
// could use one line instead: const router = require('express').Router();
var tweetBank = require('../tweetBank');
var socketio = require('socket.io'); // Imports the Socket.io Lib: https://socket.io/

router.use(express.static('public')); // this line sets the basic static file route to start with the public folder, it searches in order

// module.exports = router;

// This change is to connect the socketio to the routes

module.exports = function(io) {
    router.get('/users/:name', function(req, res) {
        var name = req.params.name;
        var tweets = tweetBank.find({
            name: name
        });
        res.render('index', {
            tweets: tweets,
            showForm: true,
            name: name
        });
    });

    router.get('/tweets/:id', function(req, res) {
        var id = req.params.id;
        var tweets = tweetBank.find({
            id: id
        });
        console.log(tweets);
        res.render('index', {
            tweets: tweets
        });
    });

    router.post('/tweets', function(req, res) {
        var name = req.body.name;
        var text = req.body.text;
        tweetBank.add(name, text);
        io.sockets.emit('newTweet', { /* tweet info */ });
        res.redirect('/');
    });


    router.get('/', function(req, res) {
        var tweets = tweetBank.list();
        res.render('index', {
            tweets: tweets
        });
    });
    return router;
};