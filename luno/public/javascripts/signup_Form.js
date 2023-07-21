$('#sample_form').on('submit', function(event){

    event.preventDefault();

  
    var user_name = $("#user_name").val();
    var user_email = $("#user_email").val();
    var user_password = $("#user_password").val();
    
    if( user_name != '' && user_email != '' && user_password != ""){
            

    $.ajax({
        url:"http://localhost:3000/signup_Form/action",
        method:"POST",
        data:$('#sample_form').serialize(),
        dataType:"JSON",
       
        success:function(data)
        {
            if(data.include('Data Added') ){
           
          window.location.href = '/login'
            
            }else{

                    $('#message').html("<div class='alert alert-danger'>Error in Signu Data ! </div>").fadeToggle(5000);
            }
        }
    });
}else{
    $('#message').html("<div class='alert alert-danger'>Form Should not be empty ! </div>").fadeToggle(5000);   
}

});