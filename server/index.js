const path = require("path");
const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

const history = require("connect-history-api-fallback");

var app = express(feathers());

// Parse HTTP JSON bodies
app.use(express.json());
// Parse URL-encoded params
app.use(express.urlencoded({
    extended: true
}));
// Add REST API support
app.configure(express.rest());
// Configure Socket.io real-time APIs
app.configure(socketio());


app.use(express.static(path.join(__dirname, "../dist")));
app.use(express.static(path.join(__dirname, "../dist/css")));

app.get("/", function (req, res) {
    //res.send("<h1>Hello World</h1>");
    res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.use(
    history({
        disableDotRule: true,
        verbose: true
    })
);

app.get("/index.html", function (req, res) {
    //res.send("<h1>Hello World</h1>");
    res.sendFile(path.join(__dirname, "../dist/index.html"));
});

// Register a nicer error handler than the default Express one
app.use(express.errorHandler());


//SOCKET.IO stuff
// Add any new real-time connection to the `everybody` channel
app.on('connection', connection => app.channel('everybody').join(connection));
// Publish all events to the `everybody` channel
app.publish(data => app.channel('everybody'));


const port = process.env.PORT || 3000;
app.listen(port).on('listening', function () {
    console.log("Listening on " + port);
});