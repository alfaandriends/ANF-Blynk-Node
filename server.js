var express = require('express')
var app = express()

/* Blynk Config */
var blynk_2 = require("blynk");
var blynk_1 = new blynk_2['default']('54.251.129.244', 9443);
blynk_1.connect();

/* Route (url) */
app.get('/login/:email/:password', function(req, res){
    let login =  blynk_1.login(req.params.email, req.params.password);
    let profile =  blynk_1.loadProfileGzipped();
    profile.then(function(result){
        res.send(result);
    })
})

app.get('/register', function(req, res){

    let login =  blynk_1.login('awan@alfaandfriends.com', '123123');
    login.then(function(result){
        res.send(result);
    })
})

app.get('/profile', function(req, res){
})

/* Listen Port */
app.listen(8000, () => console.log('Listening to port 8000'))