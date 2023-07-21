
var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function(request, response, next){

	response.render('app-tasks', {title : 'TASK Details',session:request.session});


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
	var query = "SELECT * FROM addtask where priority=3";

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
/* if(action == 'task_today')
{
	var query = "select * from addtask where blast_date > (current_date - interval 7 day";

	database.query(query, function(error, data){

		response.json({
			data:data
		});

	});
} */

/* End Code For This Week Task */


	if(action == 'Add')
	{
		var cname = request.body.cname;
		var cfrom = request.body.cfrom;
		var strt_date = request.body.strt_date;
		var asset_name = request.body.asset_name;
		var asset_link = request.body.asset_link;
		var tact = request.body.tact;
		var blast_type = request.body.blast_type;
		var blast_date = request.body.blast_date;
		var comment = request.body.comment;
		var priority = request.body.priority;
		var allocated_to = request.body.allocated_to;

		var query = `
		INSERT INTO addtask 
		(cname, cfrom,strt_date,asset_name,asset_link,tact,blast_type,blast_date,comment,priority,allocated_to) 
		VALUES ("${cname}", "${cfrom}", "${strt_date}", "${asset_name}", "${asset_link}", "${tact}", "${blast_type}", "${blast_date}", "${comment}", "${priority}", "${allocated_to}")
		`;

		database.query(query, function(error, data){

			response.json({
				message : 'Data Added'
			});

		});
	}

	if(action == 'fetch_single')
	{
		var id = request.body.id;

		var query = `SELECT * FROM addtask WHERE id = "${id}"`;

		database.query(query, function(error, data){

			response.json(data[0]);

		});
	}

	if(action == 'Edit')
	{
		//alert("app task edit");
		var id = request.body.id;

		var cname = request.body.cname;
		var cfrom = request.body.cfrom;
		var strt_date = request.body.strt_date;
		var asset_name = request.body.asset_name;
		var asset_link = request.body.asset_link;
		var tact = request.body.tact;
		var blast_type = request.body.blast_type;
		var blast_date = request.body.blast_date;
		var comment = request.body.comment;
		var priority = request.body.priority;
		var allocated_to = request.body.allocated_to;

		var query = `
		UPDATE addtask 
		SET cname = "${cname}", 
		cfrom = "${cfrom}", 
		strt_date = "${strt_date}", 
		asset_name = "${asset_name}" ,
		asset_link = "${asset_link}",
		tact = "${tact}",
		blast_type = "${blast_type}",
		blast_date = "${blast_date}",
		comment = "${comment}",
		priority = "${priority}",
		allocated_to = "${allocated_to}"
		WHERE id = "${id}"
		`;

		database.query(query, function(error, data){
			response.json({
				message : 'Data Edited'
			});
		});
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



