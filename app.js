const express = require('express');
const sensor = require('node-dht-sensor');
const path = require("path");

var app = express();
var entries = [];
app.locals.entries = entries;

app.set("views",path.resolve(__dirname,"views"));
app.set("view engine","ejs");

app.get("/",function(req, res){
  sensor.read(11,4,function(err, temp, hum){
  if(!err){ 
    entries.push({ temprature: temp, humidity: hum });
    
    res.render("index");
    //res.send("Current Temprature is: " + temp + "C \nCurrent Humidity is: " + hum + "%");
   
  }
  else{
    res.send(err);
  }
  });
});

app.listen(3000, ()=>{
  console.log("Application is running on port 3000.")
});
