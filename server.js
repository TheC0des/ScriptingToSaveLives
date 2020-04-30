var express = require("express");
var app = express();
const targetBaseUrl = "/request-error?code=404";
// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

function handleRedirect(req, res) {
  const targetUrl = targetBaseUrl + req.originalUrl;
  res.redirect(targetUrl);
}


// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/resources", function(request, response) {
  response.sendFile(__dirname + "/resources/index.html");
});

app.get("/faq", function(request, response) {
  response.sendFile(__dirname + "/faq/index.html");
});

app.get("/donate", function(request, response) {
  response.sendFile(__dirname + "/donate/index.html");
});

app.get("/code", function(request, response) {
  response.redirect("https://developers.scriptingtosavelives.com");
});

app.get("/about", function(request, response) {
  response.sendFile(__dirname + "/about/index.html");
});

app.get("/request-error", function(request, response) {
  response.sendFile(__dirname + "/404.html");
});

app.get("*", function(req, res) {
  res.redirect("/request-error?code=404");
});

app.use(function(error, req, res, next) {
  res.redirect("/request-error?code=500");
});

// listen for requests :)
// this should be port 3000
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});