
function  passwordMatch(){

var pw1 = $('#password').val();  
  var pw2 = $('#cnf_passowrd').val();  
  if(pw1 != pw2)  
  {   
    $('#password_err').html('<div calss= "alert alert-danger">Password not matched !</div>').fadeIn(2000)
  } else {  
    alert("Password created successfully");  
  }  
}  



