var express = require('express');
var router = express.Router();
var database = require('../database');





router.get("/", function(request, response, next){

    var user_id = request.session.user_id;
    console.log("me", user_id);

    var queryuser = `SELECT * FROM user_tbl where user_id = ${user_id}`;
   
    var query = "SELECT * FROM addtask a right join sender_tbl s on a.cname=s.client_id order by date(a.blast_date)desc,a.blast_time desc;";

    var query1 = "SELECT * FROM addtask where priority='rush' order by date(blast_date)asc,blast_time asc";
    var query2 = "SELECT * FROM campaign ORDER BY id DESC";
    var query3 = "SELECT * FROM addtask where blast_date=CURDATE()";
    var weektask = "select * from addtask where blast_date <= (current_date + interval 7 day);";
    var clientlist = "SELECT * FROM client_tbl c right join sender_tbl s on c.client_id=s.client_id ";
    var userlist = "SELECT * FROM  user_tbl ORDER BY user_id DESC";
    var completed = "select * from addtask where blast_date < current_date && DATE_ADD(blast_time,interval 2 hour) < current_time ;";
    var pending = "select * from addtask where blast_date > current_date ;";
    // var client_id = request.query.client_id;
    // var mysql = require('mysql');
   // var draw = request.query.draw;
//    console.log("client_id:");
//     console.log(client_id);
//  var senderlist = 'SELECT * FROM  sender_tbl WHERE client_id ='+ mysql.escape(client_id);
  
//   console.log(request.body.client_name);
database.query(queryuser, function(error, queryuser){
        database.query(query, function(error, data){
        database.query(query1, function(error, data1){
        database.query(query2, function(error, data2){
        database.query(query3, function(error, data3){
        database.query(weektask, function(error, data4){
        database.query(clientlist, function(error, clientlist){
        database.query(userlist, function(error, userlist){
        database.query(completed, function(error, completed){
            database.query(pending, function(error, pending){
        
      //  database.query(senderlist, function(error, senderlist){
//console.log(senderlist);
            
        response.render('customEmp', {title : 'Custom Details',queryuser:queryuser,data: data,data1: data1,data2: data2,data3: data3,data4: data4,clientlist: clientlist,completed:completed,pending:pending,userlist:userlist,  session:request.session});
       
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




router.get('/get_data', function (request, response, next) {

    var draw = request.query.draw;

    var start = request.query.start;

    var length = request.query.length;

    var order_data = request.query.order;

    if (typeof order_data == 'undefined') {
        var column_name = 'addtask.id';

        var column_sort_order = 'desc';
    } else {
        var column_index = request.query.order[0]['column'];

        var column_name = request.query.columns[column_index]['data'];

        var column_sort_order = request.query.order[0]['dir'];
    }

    //search data

    var search_value = request.query.search['value'];

    var search_query = `
   (camp_name LIKE '%${search_value}%' 
   OR asset_name LIKE '%${search_value}%'
   OR blst_type LIKE '%${search_value}%'
   OR status LIKE '%${search_value}%'
   
   
   
 )
  `;
  console.log(search_query);

    //Total number of records without filtering

    database.query(`SELECT COUNT(*) AS Total FROM addtask right JOIN taskassign ON addtask.id = taskassign.camp_id left join user_tbl on taskassign.user_id=user_tbl.user_id `, function (error, data) {

        var total_records = data[0].Total;
        console.log(total_records);
        database.query(`SELECT COUNT(*) AS Total FROM addtask right JOIN taskassign ON addtask.id = taskassign.camp_id left join user_tbl on taskassign.user_id=user_tbl.user_id
          WHERE  ${search_query}`, function (error, data) {
            var total_records_with_filter = data[0].Total;

            console.log("Rajashri");
            var query = `
          SELECT * FROM  addtask right JOIN taskassign ON addtask.id = taskassign.camp_id left join user_tbl on taskassign.user_id=user_tbl.user_id
          WHERE ${search_query} 
          ORDER BY ${column_name} ${column_sort_order} 
          LIMIT ${start}, ${length}
          `;

            var data_arr = [];

            database.query(query, function (error, data) {


                data.forEach(function (row) {
                    // console.log(row.role);
                    var user_id = request.session.user_id;
                    var role = request.session.role;
                    //  console.log("user_id"+user_id);
                    //   console.log("pdid"+data.row['id']);
                    if (role == 'user' && user_id == row.user_id) {

                        data_arr.push({
                            'camp_name': row.camp_name,
                            'asset_name': row.asset_name,
                            'blst_type': row.blst_type,
                             'status': row.status,
                           'id': row.id


                        });


                    } else if (role == 'admin') {

                        data_arr.push({
                            'camp_name': row.camp_name,
                            'asset_name': row.asset_name,
                            'blst_type': row.blst_type,
                            'status': row.status,
                            'id': row.id

                        });
                    } else {

                    }
                });

                var output = {
                    'draw': draw,
                    'iTotalRecords': total_records,
                    'iTotalDisplayRecords': total_records_with_filter,
                    'aaData': data_arr
                };

                response.json(output);

            });

        });

    });

});


router.post('/action', function (request, response, next) { // fetch all query //
    var action = request.body.action;

    if (action == 'fetch') {

        var sqlu = `SELECT * FROM taskassign  `;

        database.query(sqlu, function (err, data) {


            response.json({
                data: data
            })

        });

    }


    if (action == 'fetch_single') // fetech single record query //
    {
        console.log("Fetch single ");

        var id = request.body.id;
  console.log(id);
        var swlquery = `SELECT * FROM  addtask right JOIN taskassign ON addtask.id = taskassign.camp_id left join user_tbl on taskassign.user_id=user_tbl.user_id WHERE addtask.id = ${id}`;

        console.log(swlquery);
        database.query(swlquery, function (error, data) {

            response.json(data[0]);

        });
    }


    if (action == 'check') // edit query //

    {


        var p_id = request.body.p_id;
        // console.log("p_id" + p_id);
        var user_id = request.session.user_id; // session variable //
        // console.log('session user '+user_id);

       var updateCamp = `INSERT INTO camp_info_tbl (camp_id,user_id) VALUES (${p_id},${user_id})`;
    //    console.log('the query '+updateCamp);

        database.query(updateCamp, function (error, data) {
            if (!error) {
                var updateTask = `UPDATE addtask SET status = '1'   WHERE id = ${p_id}`;
                
                database.query(updateTask, function (error, data) {
                    if (!error) {
                        response.json({
                            success: true,
                            message: 'Both Updatee success'
                        })
                    } else {
                        response.json({
                            success: false,
                            message: '2nd Updatee failed'
                        })
                    }

                })
            }
            else{
                response.json({
                    success: false,
                    message: '1st Updatee failed '+error
                })
            }

           
        });

    // if (action == 'check') // edit query //

    // {


    //     var p_id = request.body.p_id;
    //  console.log("p_id" + p_id);
    //     var user_id = request.session.user_id; // session variable //
    //     console.log('session user '+user_id);

    //    var updateCamp = `INSERT INTO camp_info_tbl (camp_id,user_id) VALUES (${p_id},${user_id})`;
    // //    console.log('the query '+updateCamp);

    //     database.query(updateCamp, function (error, data) {
    //         if (!error) {
    //             var updateTask = `UPDATE addtask SET status = '1'   WHERE id = ${p_id}`;
                
    //             console.log('updated query '+updateTask);
               
    //             database.query(updateTask, function (error, data) {

                   
    //                 if (!error) {
    //                     response.json({
    //                         success: true,
    //                         message: 'Both Updatee success'
    //                     })

    //                 } else {
    //                     response.json({
    //                         success: false,
    //                         message: '2nd Updatee failed'
    //                     })
    //                 }

    //             })
    //         }
    //         else{
    //             response.json({
    //                 success: false,
    //                 message: '1st Updatee failed '+error
    //             })
    //         }

           
    //     });








        // if (p_id == 1) {

        //     var insertQury = `INSERT INTO camp_info_tbl('camp_id') VALUES (${p_id})`;

        //     database.query(insertQury, function (error, data) {

        //         response.json({

        //             message: 'inserted'
        //         });


        //     });


        //     var updateQry = `UPDATE addtask SET status = '1'   WHERE id = ${p_id}`;


        //     database.query(updateQry, function (error, data) {

        //         response.json({

        //             message: 'updated'
        //         })

        //     })

        // }
    }


    // if (action == 'Add') { // insert query //

    //   var p_id = request.body.p_id;

    //   var sqlQry = `INSERT INTO camp_info_tbl('camp_id') VALUES (${p_id})`;
    //   console.log("insert Query"+ sqlQry);
    //   database.query(sqlQry, function(err, data) {
    //       response.json({
    //           message: "inserted"
    //       })
    //   });
    // }



})
module.exports = router;