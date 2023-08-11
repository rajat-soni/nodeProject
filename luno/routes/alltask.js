
var express = require('express');

var router = express.Router();

var database = require('../database');







router.get("/", function(request, response, next){

   
    var alltask = "SELECT * FROM addtask";

       // var query = "SELECT * FROM addtask a right join sender_tbl s on a.cname=s.client_id order by date(a.blast_date)desc,a.blast_time desc;";

       var query = "select *,a.id as eid,a.id as rbid,u.first_name as ebfname,a.camp_name as campname,CONCAT( a.blast_date ,' | ', a.blast_time) as eblast_date,a.status as ebstatus,CONCAT( a.rb_date ,' | ', a.rb_time) as rblast_date,t3.first_name as rbfname,a.camp_name as rbcampname,a.rbstatus as rb_status,a.rb_type as rbtype from user_tbl u join addtask a on u.user_id=a.allocated_to left join user_tbl t3 on a.rballocated_to=t3.user_id ";

        var query1 = " SELECT *, CONCAT(  blast_date ,' | ', blast_time) AS balst_dt, CONCAT( rb_date ,' | ', rb_time) AS rb_dt FROM addtask WHERE priority='Rush' && (CONCAT( blast_date ,' | ', blast_time) >= CURRENT_TIMESTAMP OR CONCAT( rb_date ,' | ', rb_time) >= CURRENT_TIMESTAMP)";
        var query2 = "SELECT * FROM campaign ORDER BY id DESC";
        var query3 = "SELECT * FROM addtask where blast_date=CURDATE()";
        var weektask = "SELECT *, CONCAT( blast_date ,' | ', blast_time) AS balst_dt FROM addtask WHERE blast_date BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 7 DAY)";
        var clientlist = "select *,c.client_id as cid,c.client_name as cname from client_tbl c right join sender_tbl s on c.client_id=s.client_id  ";
        var userlist = "SELECT * FROM  user_tbl ORDER BY user_id DESC";
       
       
        var completed = "select * from addtask where status=1 || rbstatus=1";
        var missed="select * FROM `addtask` WHERE (DATE_ADD(concat(blast_date, ' ', blast_time),interval 2 hour) < now() && status=0) || (DATE_ADD(concat(rb_date, ' ', rb_time),interval 2 hour) < now() && rbstatus=0)";
        var pending = "select (select count(*) from addtask where blast_date > current_date ) + (select count(*) from addtask where rb_date > current_date ) as pending";

        
        // var missed = "select * FROM `addtask` WHERE DATE_ADD(concat(blast_date, ' ', blast_time),interval 2 hour) < now() && status=0";


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
                
            response.render('alltask', {title : 'TASK Details',missed:missed,alltask:alltask,data: data,data1: data1,data2: data2,data3: data3,data4: data4,clientlist: clientlist,completed:completed,pending:pending,userlist:userlist,  session:request.session});
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

    


    // Code start for Fetch Dropdown value





    
        
    router.get('/get_sender_data11', function(request, response, next){
       
        console.log("get_sender_data11 called");
         var type = request.query.type;
     
         var search_query = request.query.parent_value;
         var id = request.query.id;
     
         if(type == 'load_senderdtl')
         {
             var query = `
             SELECT DISTINCT CONCAT( " Sender Name:","  ", sender_name  ," Sender Email:",  "  ", sender_email) AS Data FROM sender_tbl 
             WHERE client_id = '${search_query}'  
             ORDER BY sender_email ASC


             
             `;
 


            //  var query = `  SELECT DISTINCT CONCAT( " Sender Name:","  ", s.sender_name  ," Sender Email:",  "  ", s.sender_email) AS Data FROM sender_tbl s right join addtask a on a.cname=s.client_id
            //  WHERE s.client_id = '${search_query}'  && a.id = '${id}'
            //  ORDER BY s.sender_email ASC `;

            console.log(query);
 
 
            
         }
     

 
         if(action == 'Edit')
console.log("Edit action button clicked");
         var id = request.body.id;
         var action = request.query.action;
         console.log("rajashri")
         console.log(action);
         {

            if(type == 'load_asset_name11')
	{
		//alert("app task edit");
		var id = request.query.id;
        console.log(id);
             var query = `SELECT asset_name AS Data FROM addtask WHERE id = "${id}"`;
 

             // var query = `
             // SELECT asset_name AS Data FROM addtask 
             // WHERE id = '${search_query}'  `;
 
            console.log(query);
 
         }
            
         }
       
       
     
         database.query(query, function(error, data){
     
             var data_arr = [];
     
             data.forEach(function(row){
                 data_arr.push(row.Data);
             });
     
             response.json(data_arr);
     
         });
     
     });


    
// router.get('/fetchdropdown', function(request, response, next){
//     var client_id = request.query.client_id;
//     var mysql = require('mysql');
//     console.log(client_id);
//     console.log("Rajashri");
//     var senderlist = 'SELECT * FROM  sender_tbl WHERE client_id ='+ mysql.escape(client_id);
//     console.log(senderlist1);
//     database.query(senderlist1, function(error, senderlist){
//         response.render('alltask', {senderlist: senderlist});
        
//     });

// });



    // Code End for Fetch Dropdown value




router.get('/get_data', function(request, response, next){
   // alert("get data");
   

    var draw = request.query.draw;

    var start = request.query.start;

    var length = request.query.length;

    var order_data = request.query.order;

    if(typeof order_data == 'undefined')
    {
        var column_name = 'addtask.blast_date';

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
     AND (camp_name LIKE '%${search_value}%' 
      OR blast_date LIKE '%${search_value}%' 
     
      OR id LIKE '%${search_value}%'
     )
    `;

    //Total number of records without filtering

    database.query("SELECT COUNT(*) AS Total ,CONCAT(  blast_date ,' | ', blast_time) AS balst_dt FROM addtask", function(error, data){

        var total_records = data[0].Total;

        //Total number of records with filtering

        database.query(`SELECT COUNT(*) AS Total ,CONCAT(  blast_date ,' | ', blast_time) AS balst_dt FROM addtask WHERE 1 ${search_query}`, function(error, data){

            var total_records_with_filter = data[0].Total;

            var query = `
            SELECT * ,CONCAT(  blast_date ,' | ', blast_time) AS balst_dt FROM addtask 
            WHERE 1 ${search_query} 
            ORDER BY ${column_name} ${column_sort_order} 
            LIMIT ${start}, ${length}
            `;



            var data_arr = [];

            database.query(query, function(error, data){

                data.forEach(function(row){

                    
const getDate = () => {
    const newDate = new Date();
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const d = newDate.getDate();
    
    return `${year}-${month.toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`;
  }
  
  console.log("GetDate" +getDate());
  console.log("RBStatus" +row.rbstatus);
  console.log("EBSTatus" +row.status);


// if(row.rbstatus=="1")
// {
//     var rbstatus= `<span class="bg-success text-light px-1 rounded small">RB-Done</span>`;
// }
// else  if(row.rbstatus=="0" && row.rb_date!=""  && getDate() > row.rb_date){
//     var rbstatus=  `<span class="bg-danger text-light px-1 rounded small">RB-Missed</span>`;
// }
// else if(row.rbstatus=="0" && row.rb_date!="" && getDate() < row.rb_date){
//     var rbstatus= `<span class="bg-info text-light px-1 rounded small">RB-Pending</span>`;
// }
// else{
//     var rbstatus="";
// }


// if(row.status=="1")
// {
//     var ebstatus=  `<span class="bg-success text-light px-1 rounded small">EB-Done</span>`;
//     console.log("Eblast current date 1");
//     console.log(getDate());
// }
// else  if(row.status=="0" && getDate() > row.blast_date){
//     var ebstatus= `<span class="bg-danger text-light px-1 rounded small">EB-Missed</span>`;
//     console.log("Eblast current date 2" );
//     console.log(getDate());
// }
// else{
//     var ebstatus= `<span class="bg-info text-light px-1 rounded small">EB-Pending</span>`;
//     console.log("Eblast current date 3");
//     console.log(getDate());
// }

// var ebrstatus=row.camp_name +  " " + ebstatus+ " " +rbstatus;
//var status=`row.tact<span class="bg-success text-light px-1 rounded small">Done</span>`;

var priority=row.priority;
var tact=row.tact;

if(row.rb_assetname!="" && row.rb_assetlink!="")
{
    var tact="Email Blast / Reminder Blast"; 
}
else{
    var tact=row.tact;
}
if(priority=="Rush"){
  var camp_name=row.camp_name + " " +`<span class="bg-danger text-light px-1 rounded small">Rush</span>`;
}
else{
    var camp_name=row.camp_name;
}



                    data_arr.push({
                        'balst_dt' : row.balst_dt,
                        'camp_name' : camp_name,
                        'tact' : tact,
                      
                        'status' : row.status,
                        'allocated_to' : row.allocated_to,
                        'blast_date' : row.blast_date,
                        'rb_type' : row.rb_type,
						'id' : row.id
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






router.get('/get_prioritydata', function(request, response, next){


    var draw = request.query.draw;

    var start = request.query.start;

    var length = request.query.length;

    var order_data = request.query.order;

    if(typeof order_data == 'undefined')
    {
        var column_name = 'addtask.id';

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
     AND (camp_name LIKE '%${search_value}%' 
      OR blast_date LIKE '%${search_value}%' 
      
      OR tact LIKE '%${search_value}%' 
      OR id LIKE '%${search_value}%'
     )
    `;

    //Total number of records without filtering

    database.query("SELECT COUNT(*) AS Total, CONCAT(  blast_date ,' | ', blast_time) AS balst_dt ,CONCAT( rb_date ,' | ', rb_time) AS rb_dt FROM addtask WHERE priority='Rush' && (CONCAT( blast_date ,'  ', blast_time) >= CURRENT_TIMESTAMP OR CONCAT( rb_date ,'  ', rb_time) >= CURRENT_TIMESTAMP) ", function(error, data){

        var total_records = data[0].Total;

        //Total number of records with filtering

        database.query(`SELECT COUNT(*) AS Total, CONCAT(  blast_date," | ", blast_time) AS balst_dt, CONCAT( rb_date ,' | ', rb_time) AS rb_dt FROM addtask WHERE priority='Rush' && (CONCAT( blast_date ,'  ', blast_time) >= CURRENT_TIMESTAMP OR CONCAT( rb_date ,'  ', rb_time) >= CURRENT_TIMESTAMP) AND 1 ${search_query}`, function(error, data){

            var total_records_with_filter = data[0].Total;

            var query = `
            SELECT *, CONCAT(  blast_date ,' | ', blast_time) AS balst_dt, CONCAT( rb_date ,' | ', rb_time) AS rb_dt FROM addtask WHERE priority='Rush' && (CONCAT( blast_date ,'  ', blast_time) >= CURRENT_TIMESTAMP OR CONCAT( rb_date ,'  ', rb_time) >= CURRENT_TIMESTAMP)  AND 1 ${search_query} 
            ORDER BY balst_dt,${column_name} ${column_sort_order} 
            LIMIT ${start}, ${length}
            `;

            var data_arr = [];

            database.query(query, function(error, data){

                data.forEach(function(row){
                    data_arr.push({
                        'camp_name' : row.camp_name,
                        'blast_date' : row.balst_dt,
                        'tact' : row.tact,
						'id' : row.id
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








router.get('/get_todaytaskdata', function(request, response, next){


    var draw = request.query.draw;

    var start = request.query.start;

    var length = request.query.length;

    var order_data = request.query.order;

    if(typeof order_data == 'undefined')
    {
        var column_name = 'addtask.id';

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
     AND (camp_name LIKE '%${search_value}%' 
      OR blast_date LIKE '%${search_value}%' 
      OR tact LIKE '%${search_value}%' 
      OR id LIKE '%${search_value}%'
     )
    `;

    //Total number of records without filtering

    database.query("SELECT COUNT(*) AS Total, CONCAT(  blast_date ,' | ', blast_time) AS balst_dt FROM addtask where blast_date=CURDATE() order by date(blast_date)asc,blast_time asc", function(error, data){

        var total_records = data[0].Total;

        //Total number of records with filtering

        database.query(`SELECT COUNT(*) AS Total, CONCAT(  blast_date ,' | ', blast_time) AS balst_dt FROM addtask WHERE blast_date=CURDATE() AND 1 ${search_query}`, function(error, data){

            var total_records_with_filter = data[0].Total;

            var query = `
            SELECT *, CONCAT(  blast_date ,' | ', blast_time) AS balst_dt FROM addtask 
            WHERE blast_date=CURDATE() AND 1 ${search_query} 
            ORDER BY balst_dt,${column_name} ${column_sort_order} 
            LIMIT ${start}, ${length}
            `;

            var data_arr = [];

            database.query(query, function(error, data){

                data.forEach(function(row){
                    data_arr.push({
                        'camp_name' : row.camp_name,
                        'blast_date' : row.balst_dt,
                        'tact' : row.tact,
						'id' : row.id
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






router.get('/get_weeklytaskdata', function(request, response, next){


    var draw = request.query.draw;

    var start = request.query.start;

    var length = request.query.length;

    var order_data = request.query.order;

    if(typeof order_data == 'undefined')
    {
        var column_name = 'addtask.id';

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
     AND (camp_name LIKE '%${search_value}%' 
      OR blast_date LIKE '%${search_value}%' 
      OR tact LIKE '%${search_value}%' 
      OR id LIKE '%${search_value}%'
     )
    `;

    //Total number of records without filtering

    database.query("SELECT COUNT(*) AS Total, CONCAT(  blast_date ,' | ', blast_time) AS balst_dt FROM addtask WHERE blast_date BETWEEN CURDATE() AND CURDATE() + INTERVAL 7 DAY ", function(error, data){

        var total_records = data[0].Total;

        //Total number of records with filtering

        database.query(`SELECT COUNT(*) AS Total, CONCAT(  blast_date ,' | ', blast_time) AS balst_dt FROM addtask WHERE blast_date BETWEEN CURDATE() AND CURDATE() + INTERVAL 7 DAY AND 1 ${search_query}`, function(error, data){

            var total_records_with_filter = data[0].Total;

            var query = `
            SELECT *, CONCAT( blast_date ,' | ', blast_time) AS balst_dt FROM addtask WHERE blast_date BETWEEN CURDATE() AND CURDATE() + INTERVAL 7 DAY AND 1 ${search_query} 
            ORDER BY ${column_name} ${column_sort_order} 
            LIMIT ${start}, ${length}
            `;


            



            var data_arr = [];

            database.query(query, function(error, data){

                data.forEach(function(row){
                    data_arr.push({
                        'camp_name' : row.camp_name,
                        'blast_date' : row.balst_dt,
                        'tact' : row.tact,
						'id' : row.id
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




router.get("/logout", function(request, response, next){
	response.send("Logged out")

});


router.post("/action", function(request, response, next){

	var action = request.body.action;

	if(action == 'fetch')
	{
		var query = "SELECT * FROM addtask ORDER BY id DESC";

		
		database.query(query, function(error, data){

			response.json({
				data:data
			});

		});
	}




/* Start Code For Priority Task */
if(action == 'task_priority')
{
	var query = "SELECT * FROM addtask where priority='Rush'";

	database.query(query, function(error, data){

		response.json({
			data:data
		});

	});
}

/* End Code For Priority Task */

/* Start Code For Today's Task */



if(action == 'task_today')
{
	var query = "SELECT * FROM addtask where blast_date=CURDATE()";

	database.query(query, function(error, data){

		response.json({
			data:data
		});

	});
}



/* End Code For Today's Task */



/* Start Code For This Week Task */
if(action == 'task_week')
{
	var query = "select * from addtask where blast_date > (current_date - interval 7 day)";

	database.query(query, function(error, data){

		response.json({
			data:data
		});

	});
}

/* End Code For This Week Task */


	if(action == 'Add')
	{
        var cname = request.body.cname;
        var camp_name = request.body.camp_name;
		var camp_from = request.body.camp_from;
        var blast_count = request.body.blast_count;
		var asset_name = request.body.asset_name;
		var asset_link = request.body.asset_link;
      
		var tact = request.body.tact;
		var blast_type = request.body.blast_type;
		var blast_date = request.body.blast_date;
        var blast_time = request.body.blast_time;
        var rb_type = "";
        var rb_assetname = "";
		var rb_assetlink = "";
        var rb_date	 = "";
        var rb_time	 = "";
		var comment = request.body.comment;
		var priority = request.body.priority;
		var allocated_to = request.body.allocated_to;
        var status = 0;
        var cname = cname[0];
console.log(cname);
        var query = `
		INSERT INTO addtask 
		(cname,camp_name, camp_from,blast_count,asset_name,asset_link,tact,blast_type,blast_date,blast_time,rb_type,rb_assetname,rb_assetlink,rb_date,rb_time,comment,priority,allocated_to,status) 
		VALUES ("${cname}", "${camp_name}","${camp_from}","${blast_count}", "${asset_name}", "${asset_link}", "${tact}", "${blast_type}", "${blast_date}","${blast_time}", "${rb_type}", "${rb_assetname}","${rb_assetlink}","${rb_date}","${rb_time}","${comment}", "${priority}", "${allocated_to}", "${status}")
		`;
console.log(query);
		database.query(query, function(error, data){

			response.json({
				message : 'Data Added'
			});

		});
	}

	if(action == 'fetch_single')
	{
		console.log("Raj Fetch single");

		var id = request.body.id;
        console.log(id);

		var query = `SELECT * FROM  addtask a right join sender_tbl s on a.cname=s.client_id WHERE a.id = "${id}"`;
console.log("Fetch Single Query");
        console.log(query);
		database.query(query, function(error, data){

			response.json(data[0]);

		});
	}





    if(action == 'fetch_single_view')
	{
		//alert("Fetch Single Record");
		var id = request.body.id;
        console.log("id" +id);

		var query = `SELECT * FROM sender_tbl s right join addtask a on s.client_id=a.cname right join client_tbl c on s.client_id=c.client_id right join user_tbl u on a.allocated_to=u.user_id WHERE a.id = "${id}"`;
console.log("Fetch Single Query For View");
        console.log(query);
		database.query(query, function(error, data){

			response.json(data[0]);

		});
	}



    if(action == 'fetch_senderdtl')
	{
      //  console.log("Fetch sender detail");
		//alert("Fetch Single Record");
		//var id = request.body.id;
        var cname = request.body.cname;
        
		//var query = `SELECT * FROM  addtask a right join sender_tbl s on a.cname=s.client_id WHERE  a.cname="${cname}"`;
       

        var query = `select *,c.client_id as cid,c.client_name as cname from client_tbl c right join sender_tbl s on c.client_id=s.client_id WHERE  c.client_id="${cname}"`;
        console.log(query);
		database.query(query, function(error, data){

			response.json(data[0]);

		});
	}




    if(action == 'fetch_senderdtladd')
	{
       console.log("Fetch sender detail");
		//alert("Fetch Single Record");
		//var id = request.body.id;
        var cname = request.body.cname;
        console.log(cname);
		var query = `select *,c.client_id as cid from client_tbl c right join sender_tbl s on c.client_id=s.client_id where s.client_id="${cname}"`;
        console.log(query);

		database.query(query, function(error, data){

			response.json(data[0]);

		});
	}


    
   /*  if(action == 'fetch_senderdtl')
	{
      //  console.log("Fetch sender detail");
		//alert("Fetch Single Record");
		//var id = request.body.id;
        var cname = request.body.cname;
        
		var query = `SELECT * FROM addtask a left join sender_tbl s on a.cname=s.client_id left join client_tbl c on s.client_id=c.client_id WHERE  a.cname="${cname}"`;
        console.log(query);

		database.query(query, function(error, data){

			response.json(data[0]);

		});
	}
 */


    

	if(action == 'Edit')
	{
console.log("Clicked on Edit Button");

		//alert("app task edit");
		var id = request.body.id;

        var cname = request.body.cname;
        var camp_name = request.body.camp_name;
		var camp_from = request.body.camp_from;
        var blast_count = request.body.blast_count;
		var asset_name = request.body.asset_name;
		var asset_link = request.body.asset_link;
        var rb_type=request.body.blast_typerr;
        var rb_assetname = request.body.rb_assetname;
		var rb_asset_link = request.body.rb_asset_link;
        var rb_date = request.body.rb_date;
       // var rb_date = request.body.rb_date;
        console.log("Reminder Blast Date displayed");
        console.log(rb_date);
		var rb_time = request.body.rb_time;
        var rballocated_to = request.body.rballocated_to;
        
		var tact = request.body.tact;
		var blast_type = request.body.blast_type;
		var blast_date = request.body.blast_date;
        var blast_time = request.body.blast_time;
		var comment = request.body.comment;
		var priority = request.body.priority;
		var allocated_to = request.body.allocated_to;
        var cname = cname[0];
if(rb_assetname!="" && rb_asset_link!="")
{
    var query = `
    UPDATE addtask 
    SET cname = "${cname}", 
    camp_name = "${camp_name}", 
    camp_from = "${camp_from}", 
    blast_count = "${blast_count}", 
    asset_name = "${asset_name}" ,
    asset_link = "${asset_link}",
    rb_type = "${rb_type}" ,
    rb_assetname = "${rb_assetname}" ,
    rb_assetlink = "${rb_asset_link}",
    rb_date = "${rb_date}" ,
    rb_time = "${rb_time}",
    rballocated_to="${rballocated_to}",
    tact = "${tact}",
    blast_type = "${blast_type}",
    
    
    comment = "${comment}",
    priority = "${priority}",
    allocated_to = "${allocated_to}"
    WHERE id = "${id}"
    `;
            
    console.log("Update Query");
    console.log(query);
            database.query(query, function(error, data){
                response.json({
                    message : 'Data Edited'
                });
            });
}
   
else{
    var query = `
    UPDATE addtask 
    SET cname = "${cname}", 
    camp_name = "${camp_name}", 
    camp_from = "${camp_from}", 
    blast_count = "${blast_count}", 
    asset_name = "${asset_name}" ,
    asset_link = "${asset_link}",
    
    tact = "${tact}",
    blast_type = "${blast_type}",
    
    
    comment = "${comment}",
    priority = "${priority}",
    allocated_to = "${allocated_to}"
    WHERE id = "${id}"
    `;
            
    console.log("Update Query");
    console.log(query);
            database.query(query, function(error, data){
                response.json({
                    message : 'Data Edited'
                });
            });
}







		
	}

	if(action == 'delete')
	{
		var id = request.body.id;

		var query = `DELETE FROM addtask WHERE id = "${id}"`;

		database.query(query, function(error, data){

			response.json({
				message : 'Data Deleted'
			});

		});
	}





});

module.exports = router;



