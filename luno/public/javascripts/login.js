
$('#sample_form').on('submit', function(event) {

    event.preventDefault();
    
    var user_name = $("#user_name").val();


    var password = $("#password").val();

    if( user_name != '' && password != ""){

    $.ajax({
        url: "/login",
        method: "POST",
        data: { user_name : user_name, password : password 
         },
         dataType: "JSON",
        success: function(data)
       
        {

            Swal.fire({
                position: 'top-down',
                icon: 'success',
                title: 'Your are login successfully..',
                showConfirmButton: false,
                timer: 1600
              })

            // $('#message').html("<div class='alert alert-success'><center>Login Successful<center></div>");
            console.log(data);
            console.log(data.data);
            const data1 = data;

            const data2 = data1.data;
            const finalData = data2[0];
            console.log(finalData.role)

            if(finalData.role == 'user'){
                
                setTimeout( ()=>{
                    window.location.href = 'http://localhost:3000/customEmp';
                },1000);
                //window.location.href = 'http://localhost:3000/customEmp';
            }else{

                setTimeout( ()=>{
                    window.location.href = 'http://localhost:3000/alltask';
                }, 1000)
 
            }
           
        },
        error: function(data){

            Swal.fire({
                position: 'top-down',
                icon: 'error',
                title: 'Oops...',
                text: 'Please check Credentials..',
                // footer: '<a href="">Why do I have this issue?</a>'
              })
            //$('#message').html("<div class='alert alert-danger'>Please Check Your Credentials </di>").fadeToggle(2000);
        }
    });
    
}else{
    
        
    
        $('#message').html("<div class='alert alert-danger'>Field Should Not Be Empty ! </di>").fadeToggle(2000);
    
   
}

});