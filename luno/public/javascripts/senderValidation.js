var sender_name_error = document.getElementById("sender_name_error")
var email_error = document.getElementById("email_error")
 var client_id_error = document.getElementById("client_id_error")

var sender_name1  = document.getElementById("sender_name")

var sender_email1 = document.getElementById('sender_email')
var client_id = document.getElementById('client_id')

 sender_name_error.disabled = true;
 email_error.disabled = true;
 client_id_error.disabled = true;

var btnClick = document.getElementById('action_button')

sender_name.onkeyup = () => {

    senderFormValidationCheck() // function call
}



function senderFormValidationCheck(){  // defination of function //
    var sender_name = document.getElementById('sender_name').value;
   
    if(sender_name.length <= 3){
        sender_name_error.innerHTML = 'First Name Must be in 3 letters'
        sender_name_error.disabled = false;
        sender_name1.style.borderColor = "#B2BABB"; 
        return false;
    }
    if(sender_name.length == 0){
        sender_name_error.innerHTML = 'Please Enter Name'
        sender_name_error.disabled = false; 
        sender_name1.style.borderColor = "#B2BABB"; 
        return false;
    }
    if(!sender_name.match(/^[a-zA-Z]/)){
        sender_name_error.innerHTML = 'Please Enter Valid Name';
        sender_name_error.disabled = false;
        sender_name1.style.borderColor = "#B2BABB"; 
        return false;
        
    }

    sender_name_error.innerHTML ='';
    sender_name_error.disabled = true;     
    sender_name1.style.borderColor = "#34eb40";  
} //end of sender_name //


 // sender email validation code start //
sender_email.onkeyup = () => {

  senderEmailValidationCheck()
}

// var email_error = document.getElementById("email_error")
//     email_error = true;

function senderEmailValidationCheck(){ 
    var sender_email = document.getElementById('sender_email').value;
    

    if(sender_email.length <= 3){
        email_error.innerHTML = 'Email at least 4 letters..'
        email_error.disabled = false;
        sender_email1.style.borderColor = "#B2BABB";  
        return false;
    }
    if(!sender_email.match( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
        email_error.innerHTML = ' <p style = "color:red;">Please enter  Valid email like @ etc..</p>';
        sender_email1.style.borderColor = "#B2BABB";  
        email_error.disabled = false;
         
         return false;
    }
    if(sender_email == ""){
        email_error.innerHTML = 'email should not be empty..';
        email_error.disabled = false;
        sender_email1.style.borderColor = "#B2BABB";  
        return false;
    }



    email_error.innerHTML ='';
    email_error.disabled = true;  
    sender_email1.style.borderColor =  "#34eb40";  
} // end of email //







var client_id_new = document.getElementById('client_id')

client_id_new.onchange = () => { // code for client id validation //
    

    clientIdValidationCheck();
 
 }


function clientIdValidationCheck(){
 var client_id_new =    document.getElementById('client_id');
     if(client_id_new.value == ""){
    
        client_id_error.innerHTML = 'Please select  record';
        client_id_error.disabled = false;
        client_id.style.borderColor = "#B2BABB"
        return false;  
    }else {
    client_id_error.disabled = true;
    client_id_error.innerHTML = ""
   
    }
}  // end code 



    var btnClick = document.getElementById('action_button');
    var sender_name_error = document.getElementById("sender_name_error");
    var email_error = document.getElementById("email_error");
    var client_id_error = document.getElementById("client_id_error");

btnClick.onclick = () => {       // all function condition start //
    sender_name_error.disabled = true;
    email_error.disabled = true;
    client_id_error.disabled = true;
    senderFormValidationCheck()
    senderEmailValidationCheck()
    clientIdValidationCheck()


        if((sender_name_error.disabled == true)  && (email_error.disabled == true) && (client_id_error.disabled == true) ){ 
          return true;
        }else{
            return false;    
            }
}
