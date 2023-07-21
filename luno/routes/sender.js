var express = require('express');
var router = express.Router();
var database = require('../database');

// router.get("/", function(request, response, next){


//     var query = "SELECT * FROM client_tbl left join  sender_tbl ON sender_tbl.client_id = client_tbl.client_id";
     

//             database.query(query, function(error, data){
        
//                 response.render('sender', {title : 'Sender Module', data:data, session:request.session});
            
    
//         });
	

// });




     

router.get("/", function(request, response, next){

   
    var querysender = `SELECT * FROM client_tbl`;
    var query = "SELECT * FROM addtask a right join sender_tbl s on a.cname=s.client_id order by date(a.blast_date)desc,a.blast_time desc;";

    var query1 = "SELECT * FROM addtask where priority='rush' order by date(blast_date)asc,blast_time asc";
    var query2 = "SELECT * FROM campaign ORDER BY id DESC";
    var query3 = "SELECT * FROM addtask where blast_date=CURDATE()";
    var weektask = "select * from addtask where blast_date <= (current_date + interval 7 day);";
    var clientlist = "SELECT * FROM client_tbl c right join sender_tbl s on c.client_id=s.client_id ";
    var userlist = "SELECT * FROM  user_tbl ORDER BY user_id DESC";
    var completed = "select * from addtask where status=1 || rbstatus=1";
    var missed="select * FROM `addtask` WHERE (DATE_ADD(concat(blast_date, ' ', blast_time),interval 2 hour) < now() && status=0) || (DATE_ADD(concat(rb_date, ' ', rb_time),interval 2 hour) < now() && rbstatus=0)";
    var pending = "select (select count(*) from addtask where blast_date > current_date ) + (select count(*) from addtask where rb_date > current_date ) as pending";

   
   
    database.query(missed, function(error, missed){
        database.query(query, function(error, data){
        database.query(query1, function(error, data1){
        database.query(query2, function(error, data2){
        database.query(query3, function(error, data3){
        database.query(weektask, function(error, data4){
        database.query(clientlist, function(error, clientlist){
        database.query(userlist, function(error, userlist){
        database.query(completed, function(error, completed){
       database.query(pending, function(error, pending){
        database.query(querysender, function(error, querysender){
        
      //  database.query(senderlist, function(error, senderlist){
//console.log(senderlist);
             console.log(querysender);
        response.render('sender', {title : 'Sender Module',querysender:querysender,data: data,data1: data1,data2: data2,data3: data3,data4: data4,clientlist: clientlist,completed:completed,pending:pending,userlist:userlist,  session:request.session,missed:missed});
       
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
                        'client' : row.client_id,
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
        var client_id = request.body.client_id;
       

        var sqlQry = `INSERT INTO sender_tbl (sender_name, sender_email,client_id) VALUES ('${sender_name}','${sender_email}','${client_id}')`;
        database.query(sqlQry, function(err, data) {
            response.json({
                message: "Sender Request Addded Successfully.."
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
        var client_id = request.body.client_id;  

        var sqlQryUpdated =
            `UPDATE sender_tbl SET 
            sender_name = "${sender_name}", 
            sender_email = "${sender_email}" 
            WHERE sender_id = "${sender_id}"`;

        database.query(sqlQryUpdated, function(error, data) {
         
            response.json({
                message: 'Sender Request Updated Successfully..'
            })

        })

    }


    if(action == 'delete'){ // delete  Record query //
		var sender_id = request.body.sender_id;

		var query = `DELETE FROM sender_tbl WHERE sender_id = "${sender_id}"`;

		database.query(query, function(error, data){

			response.json({
				message : 'Sender Request Deleted Successfully..'
			});

		});
	}

});


// router.get("/", function(request, response, next){

//     //console.log(request.session);
        

//     })
module.exports = router;