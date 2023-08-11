var express = require('express');
var router = express.Router();
var database = require('../database');







         

router.get("/", function(request, response, next){

   
   
    var query = "SELECT * FROM addtask a right join sender_tbl s on a.cname=s.client_id order by date(a.blast_date)desc,a.blast_time desc;";

    var query1 = " SELECT *, CONCAT(  blast_date ,' | ', blast_time) AS balst_dt, CONCAT( rb_date ,' | ', rb_time) AS rb_dt FROM addtask WHERE priority='rush' && (CONCAT( blast_date ,' | ', blast_time) >= CURRENT_TIMESTAMP OR CONCAT( rb_date ,' | ', rb_time) >= CURRENT_TIMESTAMP)";
        var query2 = "SELECT * FROM campaign ORDER BY id DESC";
        var query3 = "SELECT * FROM addtask where blast_date=CURDATE()";
        var weektask = "SELECT *, CONCAT( blast_date ,' | ', blast_time) AS balst_dt FROM addtask WHERE blast_date BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 7 DAY)";
        var clientlist = "select *,c.client_id as cid,c.client_name as cname from client_tbl c right join sender_tbl s on c.client_id=s.client_id  ";
        var userlist = "SELECT * FROM  user_tbl ORDER BY user_id DESC";
       
       
        var completed = "select * from addtask where status=1 || rbstatus=1";
        var missed="select * FROM `addtask` WHERE (DATE_ADD(concat(blast_date, ' ', blast_time),interval 2 hour) < now() && status=0) || (DATE_ADD(concat(rb_date, ' ', rb_time),interval 2 hour) < now() && rbstatus=0)";
        var pending = "select (select count(*) from addtask where blast_date > current_date ) + (select count(*) from addtask where rb_date > current_date ) as pending";

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
        database.query(completed, function(error, completed){
            database.query(pending, function(error, pending){
                database.query(missed, function(error, missed){
        
      //  database.query(senderlist, function(error, senderlist){
//console.log(senderlist);
            
        response.render('client', {title : 'Client Module',data: data,data1: data1,data2: data2,data3: data3,data4: data4,clientlist: clientlist,completed:completed,pending:pending,userlist:userlist,  session:request.session,missed:missed});
       
    });

    });   
    });  
});
    });
    });
    });
        });
    });
});

});




    
router.get('/get_data', function(request, response, next){ 

    var draw = request.query.draw;

    var start = request.query.start;

    var length = request.query.length;

    var order_data = request.query.order;

    if(typeof order_data == 'undefined')
    {
        var column_name = 'client_tbl.client_id';

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
     AND (client_name LIKE '%${search_value}%' 
       
      OR client_id LIKE '%${search_value}%'
     )
    `;

    //Total number of records without filtering

    database.query("SELECT COUNT(*) AS Total FROM client_tbl", function(error, data){

        var total_records = data[0].Total;

        //Total number of records with filtering

        database.query(`SELECT COUNT(*) AS Total FROM client_tbl WHERE 1 ${search_query}`, function(error, data){

            var total_records_with_filter = data[0].Total;

            var query = `
            SELECT * FROM client_tbl 
            WHERE 1 ${search_query} 
            ORDER BY ${column_name} ${column_sort_order} 
            LIMIT ${start}, ${length}
            `;

            var data_arr = [];

            database.query(query, function(error, data){

                data.forEach(function(row){
                    data_arr.push({
                        'client_name' : row.client_name,
                        // 'client_email' : row.client_email,
                       'client_id' : row.client_id 
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


router.post("/action", function(request, response, next){

        var action = request.body.action;
    
        if(action == 'fetch')
        {
            var query = "SELECT * FROM client_tbl ORDER BY id DESC";
    
            
            database.query(query, function(error, data){
    
                response.json({
                    data:data
                });
    
            });
        }
    
    

      
    if (action == 'Add') { // insert query //

        var client_name = request.body.client_name;
        //   var client_email = request.body.client_email;
   
        
        var sqlQry = `INSERT INTO client_tbl (client_name) VALUES ('${client_name}')`;

      
        database.query(sqlQry, function(err, data) {

            response.json({
                message: "Client Request Added Successfully.."
            })
        });

    }

    if (action == 'fetch_single') // fetech single record query //
    {
        var client_id = request.body.client_id;

        var swlquery = `SELECT * FROM client_tbl WHERE client_id = '${client_id}' `;

        database.query(swlquery, function(error, data) {

            response.json(data[0]);

        });
    }

    if (action == 'Edit') { // edit query //
        var client_id = request.body.client_id;
        var client_name = request.body.client_name;
     
        // var client_email = request.body.client_email;
        
        var sqlUpdate = `UPDATE client_tbl SET 
        client_name ='${client_name}'
        
        WHERE client_id  = '${client_id}'`;

       
        database.query(sqlUpdate, function(err, data) {

            response.json({
                message: "Client Request Updated Successfully.."
            })
        });

    }

    if(action == 'delete') //  delete code //
	{
		var client_id = request.body.client_id;

		var query = `DELETE FROM client_tbl WHERE client_id = '${client_id}' `;

		database.query(query, function(error, data){

			response.json({

				message : 'Client Request Deleted Successfully..'
			});

		});
	}

})

module.exports = router;
