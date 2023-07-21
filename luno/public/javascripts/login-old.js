$('#sample_form').on('submit', function(event) {

    event.preventDefault();
    
    var user_email = $("#user_email").val();
    var user_password = $("#user_password").val();

    if( user_email != '' && user_password != ""){

    $.ajax({
        url: "http://localhost:3000/login/userLogin/action",
        method: "POST",
        data: {
            action: 'fetch'
         },
        dataType: "JSON",
        beforeSend: function() {
            $('#action_button').attr('disabled', 'disabled');
        },
        success: function(data)

        {
          
            window.location.href = 'http://localhost:3000/';

            

            setTimeout(function() {
                $('#message').html('');
            }, 5000);
        }
    });
}else{
    
        
    
        $('#message').html("<div class='alert alert-danger'>Field should not be Empty ! </di>").fadeToggle(5000);
    
   
}

});