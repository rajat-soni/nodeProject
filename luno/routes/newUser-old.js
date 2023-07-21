var express = require('express');
var router = express.Router();
var database = require('../database');





            
router.get("/", function(request, response, next){

   
    var alltask = "SELECT * FROM addtask";

        var query = "SELECT * FROM addtask a right join sender_tbl s on a.cname=s.client_id order by date(a.blast_date)desc,a.blast_time desc;";

        var query1 = "SELECT * FROM addtask where priority='rush' order by date(blast_date)asc,blast_time asc";
        var query2 = "SELECT * FROM campaign ORDER BY id DESC";
        var query3 = "SELECT * FROM addtask where blast_date=CURDATE()";
        var weektask = "select * from addtask where blast_date <= (current_date + interval 7 day);";
        var clientlist = "SELECT * FROM client_tbl c right join sender_tbl s on c.client_id=s.client_id ";
        var userlist = "SELECT * FROM  user_tbl ORDER BY user_id DESC";
        var completed = "select * from addtask where status=1 || status=2";
        var pending = "select * from addtask where blast_date > current_date ;";
        var missed = "select * FROM `addtask` WHERE DATE_ADD(concat(blast_date, ' ', blast_time),interval 2 hour) < now() && status=0 ";
        // var client_id = request.query.client_id;
        // var mysql = require('mysql');
       // var draw = request.query.draw;
    //    console.log("client_id:");
    //     console.log(client_id);
    //  var senderlist = 'SELECT * FROM  sender_tbl WHERE client_id ='+ mysql.escape(client_id);
      
 //   console.log(request.body.client_name);
 database.query(alltask, function(error, alltask){
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
                
            response.render('newUser', {title : 'User Module',alltask:alltask,data: data,data1: data1,data2: data2,data3: data3,data4: data4,clientlist: clientlist,completed:completed,pending:pending,userlist:userlist,  session:request.session,missed:missed});
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
                    var column_name = 'user_tbl.user_id';
            
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
                 AND (first_name LIKE '%${search_value}%' 
                  OR last_name LIKE '%${search_value}%'  
                  OR email LIKE '%${search_value}%'
                  OR phone LIKE '%${search_value}%'
                  OR user_name LIKE '%${search_value}%'
                  OR password LIKE '%${search_value}%'
                  OR cnf_password LIKE '%${search_value}%'
                  OR date LIKE '%${search_value}%'
                 )
                `;
            
                //Total number of records without filtering
            
                database.query("SELECT COUNT(*) AS Total FROM user_tbl", function(error, data){
            
                    var total_records = data[0].Total;
            
                    //Total number of records with filtering
            
                    database.query(`SELECT COUNT(*) AS Total FROM user_tbl WHERE 1 ${search_query}`, function(error, data){
            
                        var total_records_with_filter = data[0].Total;
            
                        var query = `
                        SELECT * FROM user_tbl 
                        WHERE 1 ${search_query} 
                        ORDER BY ${column_name} ${column_sort_order} 
                        LIMIT ${start}, ${length}
                        `;
            
                        var data_arr = [];
            
                        database.query(query, function(error, data){
            
                            data.forEach(function(row){
                                data_arr.push({
                                    'first_name' : row.first_name,
                                    'last_name' : row.last_name,
                                    'email' : row.email,
                                    'phone' : row.phone,
                                    'user_name' : row.user_name,
                                    'password' : row.password,
                                    'cnf_password' : row.cnf_password,
                                    'role' : row.role,
                                    'date' : row.date,
                                   'user_id' : row.user_id 
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
        
                var sqlu = `SELECT * FROM  user_tbl`;
        
                database.query(sqlu, function(err, data) {
                   
        
                    response.json({
                        data: data
                    })
        
                });
        
            }
            
          
             

    if (action == 'Add') { // insert query //

        var first_name = request.body.first_name;
        var last_name = request.body.last_name;
        var email = request.body.email;
        var phone = request.body.phone;
        var user_name = request.body.user_name;
        var password = request.body.password;
        var cnf_password = request.body.cnf_password;
        var role = request.body.role;
       
       
        var sqlInsertQry = `INSERT INTO user_tbl(first_name, last_name, email, phone, user_name, password, cnf_password, role) VALUES ('${first_name}','${last_name}','${email}','${phone}','${user_name}','${password}','${cnf_password}', '${role}')`;
   
        database.query(sqlInsertQry, function(err, data) {
            response.json({
                message: "Contact Request Submitted Successfully.."
            })
        });

    }


    if (action == 'fetch_single') // fetech single record query //
    {
        var user_id = request.body.user_id;

        var swlquery = `SELECT * FROM user_tbl WHERE user_id = "${user_id}"`;

        database.query(swlquery, function(error, data) {

            response.json(data[0]);

        });
    }


    if (action == 'Edit') // edit query //

    {

        var user_id = request.body.user_id;
      
        var first_name = request.body.first_name;
        var last_name = request.body.last_name;
        var email = request.body.email;
        var phone = request.body.phone;
        var user_name = request.body.user_name;
        var password = request.body.password;
        var cnf_password = request.body.cnf_password;
        var role = request.body.role;
        

        var updateQry = `UPDATE user_tbl SET first_name = '${first_name}', last_name = '${last_name}', email = '${email}', phone = '${phone}', user_name = '${user_name}', password = '${password}', cnf_password = '${cnf_password}', role = '${role}' WHERE user_id = '${user_id}' `;

         console.warn(updateQry);
         
        database.query(updateQry, function(error, data) {
         
            response.json({

                message: 'Contact Request Updated Successfully..'
            })

        })

    }


    if(action == 'delete')
	{
		var user_id = request.body.user_id;

		var query = `DELETE FROM user_tbl WHERE user_id = "${user_id}"`;

		database.query(query, function(error, data){

			response.json({
				message : 'Contact Request Deleted Successfully..'
			});

		});
	}

});

module.exports = router;