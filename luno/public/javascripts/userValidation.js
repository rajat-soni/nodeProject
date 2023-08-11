var first_name_error = document.getElementById("first_name_error")
var last_name_error = document.getElementById("last_name_error")
var user_email_error = document.getElementById("user_email_error");
var mobile_error = document.getElementById("mobile_error");
var user_name_error = document.getElementById("user_name_error");
var role_error = document.getElementById("role_error_value");
var password_error1 = document.getElementById("password_error1");



var first_name  = document.getElementById("first_name")
var last_name = document.getElementById('last_name')
var user_email = document.getElementById('email')
var phone = document.getElementById('phone')
var user_name = document.getElementById('user_name')
var role = document.getElementById('role')
var password = document.getElementById('password')



 first_name_error.disabled = true;
 user_email_error.disabled = true;
 mobile_error.disabled = true;
 user_name_error.disabled = true;
//  password_error.disabled = true;
role_error.disabled = true;
//  email_error.disabled = true;
//  client_id_error.disabled = true;

var btnClick = document.getElementById('action_button')

first_name.onkeyup = () => {

    userFormValidationCheck() // function call
}



function userFormValidationCheck(){  // defination of function //
    var first_name_new = document.getElementById('first_name').value;
   
    if(first_name_new.length < 3){
        first_name_error.innerHTML = '*first name Must be  3 letters'
        first_name_error.disabled = false;
        first_name.style.borderColor = "#B2BABB"
        return false;
    }
    if(first_name_new.length == 0){
        first_name_error.innerHTML = '*please Enter first name'
        first_name_error.disabled = false; 
        first_name.style.borderColor = "#B2BABB"
        return false;
    }
    if(!first_name_new.match(/^[a-zA-Z ]{2,30}$/)){
        first_name_error.innerHTML = '*please enter valid name';
        first_name_error.disabled = false;
        first_name.style.borderColor = "#B2BABB"
        return false;
    }

    first_name_error.innerHTML ='';
    first_name_error.disabled = true; 
    first_name.style.borderColor = "#34eb40"   
} //end of user_First Name validation  //





last_name.onkeyup = () => {

    userLastNameValidationCheck();

}


function userLastNameValidationCheck(){  // defination of function //
    var last_name_new = document.getElementById('last_name').value;
   
    if(last_name_new.length <= 3){
        last_name_error.innerHTML = '*last name must be  3 letters'
        last_name_error.disabled = false;
        last_name.style.borderColor = "#B2BABB"
        return false;
    }
    if(last_name_new.length == 0){
        last_name_error.innerHTML = '*please Enter name'
        last_name_error.disabled = false; 
        last_name.style.borderColor = "#B2BABB"
        return false;
    }
    if(!last_name_new.match(/^[a-zA-Z ]{2,30}$/)){
        last_name_error.innerHTML = '*please enter valid name';
        last_name_error.disabled = false;
        last_name.style.borderColor = "#B2BABB"
        return false;
    }

    last_name_error.innerHTML ='';
    last_name_error.disabled = true; 
    last_name.style.borderColor = "#34eb40"   
} //end of user_First Name validation  //

 // sender email validation code start //
user_email.onkeyup = () => {

  userEmailValidationCheck()
}

var user_email_error = document.getElementById("user_email_error")


function userEmailValidationCheck(){ 
    var user_email_new = document.getElementById('email').value;
    
    var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;

    if(user_email_new.length <= 3){
        user_email_error.innerHTML = '*email at least 4 letters..'
        user_email.style.borderColor = "#B2BABB";
        user_email_error.disabled = false;
        return false;
    }

    if(!testEmail.test(user_email_new)){
        user_email_error.innerHTML = ' <p style = "color:red;">*Please enter  Valid email like @ etc..</p>';
        user_email_error.style.borderColor = "#B2BABB";
        user_email_error.disabled = false;
         
         return false;
    }
    
    if(user_email_new == ""){
        user_email_error.innerHTML = '*email should not be empty..';
        user_email_error.disabled = false;
        user_email.style.borderColor = "#B2BABB";
        return false;
    }



    user_email_error.innerHTML ='';
    user_email_error.disabled = true;  
    user_email.style.borderColor = "#34eb40";
} // end of email //



phone.onkeyup = () => {
    mobileValidation() ;
} 

function mobileValidation(){

    var mobile = document.getElementById('phone').value;

    if(mobile.length < 10 || mobile.length > 12){
        mobile_error.innerHTML = '<p  style = "color:red;" >*mobile no must be 10 digits.</p>'
        phone.style.borderColor = "#B2BABB";
        mobile_error.disabled = false;
            
            return false;
    }
    if(mobile.length == 0){
        mobile_error.innerHTML = '<p  style = "color:red;" >*mobile no should not be empty.</p>'
        phone.style.borderColor = "#B2BABB";
        mobile_error.disabled = false;
        
        return false;
    }
    if(!mobile.match(/^(\d{3})[- ]?(\d{3})[- ]?(\d{4})$/)){
        mobile_error.innerHTML = '<p  style = "color:red;" >*please enter valid moble no</p>';
        phone.style.borderColor = "#B2BABB";
        mobile_error.disabled = false;  

        return false;
    }

    mobile_error.innerHTML ='';
    phone.style.borderColor = "#34eb40";
    mobile_error.disabled = true;
    
    

} // end of mobile code //



 user_name.onkeyup = () => {
    userNameValidationCheck()
 }

function userNameValidationCheck(){  // defination of function //
    var user_name_new = document.getElementById('user_name').value;
   
    if(user_name_new.length <= 3){
        user_name_error.innerHTML = '*user name must be in 3 letters'
        user_name.style.borderColor = "#B2BABB"; 
        user_name_error.disabled = false;
        return false;
    }
    if(user_name_new.length == 0){
        user_name_error.innerHTML = '*please enter name';
        user_name.style.borderColor = "#B2BABB"; 
        user_name_error.disabled = false; 
        return false;
    }
    if(!user_name_new.match(/^[a-zA-Z ]{2,30}$/)){
        user_name_error.innerHTML = '*please Enter Valid Name';
        user_name.style.borderColor = "#B2BABB"; 
        user_name_error.disabled = false;
        return false;
    }

    user_name_error.innerHTML ='';
    user_name.style.borderColor = "#34eb40"
    user_name_error.disabled = true;    
} //end of user_Name validation  //






role.onchange  = () => {
    roleValidation();
}
function roleValidation() {
   
        var role_new =  document.getElementById('role');
       
            if(role_new.value == ""){
                
           
                role_error.innerHTML = '**please select lest one  record';
                role_error.disabled = false;
               return false;  
           }else {
            role_error.disabled = true;
            role_error.innerHTML = ""
           }
}  // end code 

password.onkeyup = () => {
    passwordValidation();
}


function passwordValidation(){  // defination of function //
    var password_new = document.getElementById('password').value;
      
     
   

 
    // if(){
    //     password_error1.innerHTML = '**password must less than 15 digits'
    //     password_error1.style.borderColor = "#B2BABB"; 
    //     password_error1.disabled = false;
    //     return false;
    // }
    
    
    if(!password_new.match('^(?=.*[a-z,A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z].*[a-z]).{8}$')){
        password_error1.innerHTML = '**1 upper letter, 1 special, 2 digit, 1 lower, 8 chars.';
        password_error1.style.borderColor = "#B2BABB"; 
        password_error1.disabled = false;
        return false;
    }

    if(( password_new == 10)){
        password_error1.innerHTML = '**password must be  10 digits'
        password_error1.style.borderColor = "#B2BABB"; 
        password_error1.disabled = false;
        return false;
    }

    password_error1.innerHTML ='';
    password.style.borderColor = "#34eb40"
    password_error1.disabled = true;    
} //end of user_Name validation  //




// var client_id_new = document.getElementById('client_id')

// client_id_new.onchange = () => { // code for client id validation //
    

//     clientIdValidationCheck();
 
//  }


// function clientIdValidationCheck(){
//  var client_id_new =    document.getElementById('client_id');
//      if(client_id_new.value == ""){
    
//         client_id_error.innerHTML = 'Please select  record';
//         client_id_error.disabled = false;
//         return false;  
//     }else {
//     client_id_error.disabled = true;
//     client_id_error.innerHTML = ""
//     }
// }  // end code 



// pass.matches(".*[*.!@#$%^&(){}[]:";'<>,.?/~`_+-=|\\].*")

    var btnClick = document.getElementById('action_button');
    var first_name_error = document.getElementById("first_name_error");
    var last_name_error = document.getElementById("last_name_error");
    var user_email_error = document.getElementById("user_email_error");
    var  user_name_error = document.getElementById("user_name_error")
    var role_error = document.getElementById('role_error_value')
  

btnClick.onclick = () => {       // all function condition start //
    first_name_error.disabled = true;
    last_name_error.disabled = true;
    user_email_error.disabled = true;
    mobile_error.disabled = true;
    user_name_error.disabled = true;
    role_error.disabled = true;
    password_error1.disabled = true;  
    userFormValidationCheck();
    userLastNameValidationCheck();
    userEmailValidationCheck();
    mobileValidation();
    userNameValidationCheck();
    roleValidation();
    passwordValidation();

        if((first_name_error.disabled == true ) && (last_name_error.disabled == true) && (user_email_error.disabled == true) && (mobile_error.disabled == true) && (user_name_error.disabled == true) && (role_error.disabled == true) && ( password_error1.disabled == true) ) { 

          return true;

        }else{
            return false;    
            }
}