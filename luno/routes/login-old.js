
var express = require('express');
var router = express.Router();

var database = require('../database');


router.get('/set', function(req, res, next) {
    // req.session.isAuthenticated = true;
    console.log(req.session);
    req.session.username="USER1"
   res.send("Set user: "+req.session.username);
 });
router.get('/test', function(req, res, next) {
    // req.session.isAuthenticated = true;

   res.send("test"+req.session.username);
 });


/* GET home page. */
router.get('/', function(req, res, next) {
   // req.session.isAuthenticated = true;
  res.render('login', { title: 'Express', session : req.session });
});

router.post('/', function(request, response, next){
    //req.session.isAuthenticated = true;
    var user_name = request.body.user_name;

    var password = request.body.password;

    

    if(user_name && password)
    {


        
        query = `
        SELECT * FROM user_tbl 
        WHERE user_name = "${user_name}"
        `;
        console.log(query);
        
        database.query(query, function(error, data){
           
            if(data.length > 0)
            {
               
                for(var count = 0; count < data.length; count++)
                {
                    
                    if(data[count].password == password)
                    {

                        
                        request.session.user_name = data[count].user_name;

 
                        console.log(data[count]);
                       
                        response.redirect("/alltask");
                        // console.log("data",data);
                         return;
                        
                    }
                    else
                    {
                        response.send('Incorrect Password');
                    }
                }
            }
            else
            {
                response.send('Incorrect Email Address');
            }
            response.end();
        });
    }
    else
    {
        response.send('Please Enter Email Address and Password Details');
        response.end();
    }

});

router.get('/logout', function(request, response, next){

    request.session.destroy();

    response.redirect("/");

});

module.exports = router;
