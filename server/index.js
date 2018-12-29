var express = require("express");
var app = express();
const path = require("path");
var http = require("http").Server(app);
const history = require("connect-history-api-fallback");

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


const port = process.env.PORT || 3000;
http.listen(port, function () {
    console.log("Listening on " + port);
});

