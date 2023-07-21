var express = require('express');
var router = express.Router();

var database = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('dataex', { title: 'Express' });
});

router.get('/get_data', function(request, response, next){

    var draw = request.query.draw;

    var start = request.query.start;

    var length = request.query.length;

    var order_data = request.query.order;

    if(typeof order_data == 'undefined')
    {
        var column_name = 'customer_table.customer_id';

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
     AND (customer_first_name LIKE '%${search_value}%' 
      OR customer_last_name LIKE '%${search_value}%' 
      OR customer_email LIKE '%${search_value}%' 
      OR customer_gender LIKE '%${search_value}%'
     )
    `;

    //Total number of records without filtering

    database.query("SELECT COUNT(*) AS Total FROM customer_table", function(error, data){

        var total_records = data[0].Total;

        //Total number of records with filtering

        database.query(`SELECT COUNT(*) AS Total FROM customer_table WHERE 1 ${search_query}`, function(error, data){

            var total_records_with_filter = data[0].Total;

            var query = `
            SELECT * FROM customer_table 
            WHERE 1 ${search_query} 
            ORDER BY ${column_name} ${column_sort_order} 
            LIMIT ${start}, ${length}
            `;

            var data_arr = [];

            database.query(query, function(error, data){

                data.forEach(function(row){
                    data_arr.push({
                        'customer_first_name' : row.customer_first_name,
                        'customer_last_name' : row.customer_last_name,
                        'customer_email' : row.customer_email,
                        'customer_gender' : row.customer_gender
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

module.exports = router;