var express = require('express');
var router = express.Router();
var database = require('../database');

router.get("/", function(request, response, next){

    
    var query = "SELECT * FROM  addtask a right join sender_tbl s on a.cname=s.client_id";
    var query1 = "SELECT * FROM addtask where priority=3 ORDER BY id DESC";
    var query2 = "SELECT * FROM campaign ORDER BY id DESC";
    var query3 = "SELECT * FROM addtask where blast_date=CURDATE()";
    var weektask = "select * from addtask where blast_date > (current_date - interval 7 day)";
    var clientlist = "SELECT * FROM client_tbl c right join sender_tbl s on c.client_id=s.client_id ";
    var userlist = "SELECT * FROM  user_tbl ORDER BY user_id DESC";
    // var client_id = request.query.client_id;
    // var mysql = require('mysql');
   // var draw = request.query.draw;
//    console.log("client_id:");
//     console.log(client_id);
//  var senderlist = 'SELECT * FROM  sender_tbl WHERE client_id ='+ mysql.escape(client_id);
  
//   console.log(request.body.client_name);
        database.query(query, function(error, data){
        database.query(query1, function(error, data1){
        database.query(query2, function(error, data2){
        database.query(query3, function(error, data3){
        database.query(weektask, function(error, data4){
        database.query(clientlist, function(error, clientlist){
            database.query(userlist, function(error, userlist){
        
      //  database.query(senderlist, function(error, senderlist){
//console.log(senderlist);
            
        response.render('sender', {title : 'Sender Module',data: data,data1: data1,data2: data2,data3: data3,data4: data4,clientlist: clientlist,userlist:userlist,  session:request.session});
       

        
   
});
    });
    });
    });
        });
    });
});


//	response.render('sender', {title : 'Sender Module',session:request.session});

});




    
router.get('/get_data', function(request, response, next){

    var draw = request.query.draw;

    var start = request.query.start;

    var length = request.query.length;

    var order_data = request.query.order;

    if(typeof order_data == 'undefined')
    {
        var column_name = 'sender_tbl.sender_id';

        var column_sort_order = 'desc';
    }
    else
    {
        var column_index = request.query.order[0]['column'];

        var column_name = request.query.columns[column_index]['data'];

        var column_sort_order = request.query.order[0]['dir'];
    }

    //search data

    var search_value = request.query.search['value'];

    var search_query = `
     AND (sender_name LIKE '%${search_value}%' 
      OR sender_email LIKE '%${search_value}%'  
      OR sender_id LIKE '%${search_value}%'
     )
    `;

    //Total number of records without filtering

    database.query("SELECT COUNT(*) AS Total FROM sender_tbl", function(error, data){

        var total_records = data[0].Total;

        //Total number of records with filtering

        database.query(`SELECT COUNT(*) AS Total FROM sender_tbl WHERE 1 ${search_query}`, function(error, data){

            var total_records_with_filter = data[0].Total;

            var query = `
            SELECT * FROM sender_tbl 
            WHERE 1 ${search_query} 
            ORDER BY ${column_name} ${column_sort_order} 
            LIMIT ${start}, ${length}
            `;

            var data_arr = [];

            database.query(query, function(error, data){

                data.forEach(function(row){
                    data_arr.push({
                        'sender_name' : row.sender_name,
                        'sender_email' : row.sender_email,
                       'sender_id' : row.sender_id 
                    });
                });

                var output = {
                    'draw' : draw,
                    'iTotalRecords' : total_records,
                    'iTotalDisplayRecords' : total_records_with_filter,
                    'aaData' : data_arr
                };

                response.json(output);

            });

        });

    });

});

router.post('/action', function(request, response, next) { // fetch all query //

        var action = request.body.action;
    
        if (action == 'fetch') {
    
            var sqlFetch = `SELECT * FROM sender_tbl ORDER BY sender_id DESC`;
    
            database.query(sqlFetch, function(err, data) {
    
    
                response.json({
                    data: data
                })
    
            });
    
        }
        
      


    if (action == 'Add') { // insert query //

        var sender_name = request.body.sender_name;
        var sender_email = request.body.sender_email;
       

        var sqlQry = `INSERT INTO sender_tbl (sender_name, sender_email) VALUES ('${sender_name}','${sender_email}')`;
        database.query(sqlQry, function(err, data) {
            response.json({
                message: " Sender Data Submitted"
            })
        });

    }


    if (action == 'fetch_single') // fetech single record query //
    {
        var sender_id = request.body.sender_id;

        var querySql = ` SELECT * FROM sender_tbl WHERE sender_id = '${sender_id}' `;
        // console.log(querySql);

        database.query(querySql, function(error, data) {

            response.json(data[0]);

        });
    }

    

    if (action == 'Edit') // edit query //
     {

        var sender_id = request.body.sender_id;
        var sender_name = request.body.sender_name;
        var sender_email = request.body.sender_email;   

        var sqlQryUpdated =
            `UPDATE sender_tbl SET 
            sender_name = "${sender_name}", 
            sender_email = "${sender_email}" 
            WHERE sender_id = "${sender_id}"`;

        database.query(sqlQryUpdated, function(error, data) {
         
            response.json({
                message: 'Sender Record updated'
            })

        })

    }


    if(action == 'delete'){ // delete query //
		var sender_id = request.body.sender_id;

		var query = `DELETE FROM sender_tbl WHERE sender_id = "${sender_id}"`;

		database.query(query, function(error, data){

			response.json({
				message : 'Data Deleted'
			});

		});
	}

});
module.exports = router;