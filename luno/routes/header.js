
var express = require('express');

var router = express.Router();

var database = require('../database');




// router.get("/", function(request, response, next){

//     response.render('header');
    
//     });




router.get("/", function(request, response, next){


 
      var query = "SELECT * FROM  addtask a right join sender_tbl s on a.cname=s.client_id";
      var query1 = "SELECT * FROM addtask where priority=3 ORDER BY id DESC";
      var query2 = "select * from addtask where blast_date < current_date";
      var query3 = "SELECT * FROM addtask where blast_date=CURDATE()";
      var weektask = "select * from addtask where blast_date > current_date";
     // var completed = "select * from addtask where blast_date <= current_date && DATE_ADD(blast_time,interval 2 hour) < current_time";

     


     // var missed = "select * from addtask where (blast_date <= current_date && DATE_ADD(blast_time,interval 2 hour) < current_time && status=0) || (rb_date IS NOT NULL <= current_date && DATE_ADD(rb_time IS NOT NULL,interval 2 hour) < current_time && rbstatus=0)";

     var completed = "select * from addtask where status=1 || rbstatus=1";
     var missed="select * FROM `addtask` WHERE (DATE_ADD(concat(blast_date, ' ', blast_time),interval 2 hour) < now() && status=0) || (DATE_ADD(concat(rb_date, ' ', rb_time),interval 2 hour) < now() && rbstatus=0)";
     var pending = "select * from addtask where blast_date > current_date || rb_date > current_date";

 
    
          database.query(query, function(error, data){
          database.query(query1, function(error, data1){
          database.query(query2, function(error, data2){
          database.query(query3, function(error, data3){
          database.query(weektask, function(error, data4){
            database.query(completed, function(error, completed){
              database.query(missed, function(error, missed){
        
          
        //  database.query(senderlist, function(error, senderlist){
//console.log(senderlist);
              
          response.render('header', {data: data,data1: data1,data2: data2,data3: data3,data4: data4,completed:completed,missed:missed});
         

          
        });
      });
});
    
      });
          });
      });
  });
  
  });



router.get('/alltask', (req, res) => {
    console.log('Request for home recieved');
    res.render('alltask');
  });
  
  router.get('/about', (req, res) => {
    console.log('Request for about page recieved');
    res.render('about');
  });
  
  router.get('/contact', (req, res) => {
    console.log('Request for contact page recieved');
    res.render('contact');
  });




router.get('/newUser', (req, res) => {
    //console.log('Request for about page recieved');
    res.render('newUser');
  });


    router.get('/', function (req, res) {
        res.render('header', {
          page: req.url,
          nav: {
            'Page 1': '../alltask',
            'Page 2': '../newUser',
            'Page 3': '../sender'
          }
        });
      });



$(document).ready(function(){
    var element = $('meta[name="active-menu"]').attr('content');
    $('#' + element).addClass('active');
});