var express = require( 'express' );
var app = express(); // creates an instance of an express application
var nunjucks = require('nunjucks');
var morgan = require('morgan');
var routes = require('./routes');
var bodyParser = require('body-parser');
var socketio = require('socket.io'); // Imports the Socket.io Lib: https://socket.io/


/*
nunchucks templating system getting added to express(app) instance
*/
app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
nunjucks.configure('views', {noCache: true});//point nunjucks to the proper directory for templates - The(noCache) is turned off because it only re-renders it if the data has actually changed by default

// logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests



// This is to pass the io(sokectio)reference to the routes

// or:
// var router = routes(io);
// app.use( '/', router );


// app.use(function (req, res, next) {
//     // console.log(req.method, req.url, res.statusCode);
//     // res.send(req.method +" "+req.url+" "+res.statusCode); // call `next`, or else your app will be a black hole — receiving requests but never properly responding

//     // res.render( 'index', locals ); // You can use this version and not pass a callback function.
    
//     res.render('index.html', locals, function (err, output) {
//     	console.log(output);
//     	res.send(output);
// 	});

// })

// app.get('/', function (req, res) {
//   res.send('Hello ');
// })

// app.listen(3000, function () {
//   console.log('Server Listening');
// })

var server = app.listen(3000);
var io = socketio.listen(server);

app.use('/', routes(io));

