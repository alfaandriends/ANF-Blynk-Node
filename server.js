var express = require('express')
var app = express()

/* Blynk Config */
var blynk_2 = require('./dist/lib/Blynk');
// var blynk_1 = new blynk_2['default']('alfaandfriends.tplinkdns.com', 9443);
var blynk_1 = new blynk_2['default']('192.168.1.183', 9443);

/* Route (url) */
app.get('/login/:email/:password', function(req, res) {
    blynk_1.connect();
    let login = blynk_1.login(req.params.email, req.params.password);
    login.then(function(result) {
        res.send(result + "");
    }).catch(function(){
    })
})

app.get('/register/:email/:password', function(req, res) {
    blynk_1.connect();
    let register = blynk_1.register(req.params.email, req.params.password);
    register.then(function(result) {
        res.send(result + "");
    }).catch(function(){
    })
})

app.get('/profile', function(req, res) {
    let profile = blynk_1.loadProfileGzipped();
    profile.then(function(result) {
        res.send(result);
    }).catch(function(){
    })
})

app.get('/logout', function(req, res){
    blynk_1.disconnect();
    res.send("success");
})


app.get('/createDash/:dashId/:dashName', function(req, res) {
    let createDashboard = blynk_1.createDash(req.params.dashId, req.params.dashName);
    createDashboard.then(function(result) {
        res.send(result + "");
    }).catch(function(){
    })
})

app.get('/activateDash/:dashId', function(req, res) {
    let activateDash = blynk_1.activateDash(req.params.dashId);
    activateDash.then(function(result) {
        res.send(result + "");
    }).catch(function(){
    })
})

app.get('/deactivateDash/:dashId', function(req, res) {
    let deactivateDash = blynk_1.deactivateDash(req.params.dashId);
    deactivateDash.then(function(result) {
        res.send(result + "");
    }).catch(function(){
    })
})


app.get('/hardware/:dashIdAndTargetId/:ops/:gpio/:value', function(req, res) {
    let hardware = blynk_1.hardware(req.params.dashIdAndTargetId, req.params.ops, req.params.gpio, req.params.value);
    hardware.then(function(result) {
        res.send(result);
    }).catch(function(){
    })
})
/* Listen Port */
app.listen(8000, () => console.log('Listening to port 8000 at http://127.0.0.1:8000'))