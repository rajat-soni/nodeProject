const mysql=require('mysql');
var connection=mysql.createConnection ({
    host:'localhost',
    user:'root',
    password:'',
    database:'nodejs'
});
connection.connect(function(error){
    if(error)
    {
        throw error;
    }
    else{
        console.log("Database Connected Successfully");
    }
});

module.exports=connection;