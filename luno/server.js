var express = require('express');
var session=require('express-session');
var app = express();


app.use(session({
    secret : 'webslesson',
    resave : false,
    saveUninitialized : false
  
    
  }));
  
  app.get("/",(req,resp)=>{
  
    req.session.isAuth=true;

    console.log(req.session);
    console.log(req.session.id);
    resp.send("Hello Session tutorial");
  })

  app.listen(5000,console.log("Server Running on "));