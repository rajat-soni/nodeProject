
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
    // console.log(user_name)
    var password = request.body.password;
    var user_id = request.body.user_id;

    // console.log("form : " +user_id);


    

    if(user_name && password)
    {


        
        query = `
        SELECT * FROM user_tbl 
        WHERE user_name = "${user_name}"
        `;
       
        
        database.query(query, function(error, data){
           
            if(data.length > 0)
            {
               
                for(var count = 0; count < data.length; count++)
                {
                    
                    
                    if(data[count].password == password)
                    {

                        var Role = data[count].role;
                        var user_id = data[count].user_id;
                        // console.log("form" + user_id)
                    
                        request.session.user_name = data[count].user_name;
                        request.session.user_id= data[count].user_id;
                        request.session.role= data[count].role;
                        console.log("sessionRole " +request.session.role)

                        response.json({data:data});
                        // console.log("session"+request.session.user_id)
                        //    if(Role == 'admin'){
                        //     response.redirect('/alltask')
                        //    }else if (Role == 'user'){
                        //     response.redirect('/customEmp')
                        //    }else{
                        //     // alert("Please check your credentials !");
                        //    }
 
                        // console.log(data[count]);
                       
                       
                        
                    }
                    else
                    {
                        // response.json({error:error});
                    }
                }
            }
            else
            {
                // alert("Please check your credentials !");
            }
            response.end();
        });
    }
    else
    {
        alert("Please check your credentials !");
        response.end();
    }

});

// router.get('/logout', function(request, response, next){

//     request.session.destroy();

//     response.redirect("/");

// });

module.exports = router;
