var clientErr = document.getElementById("clientError");
var clientName = document.getElementById('client_name');
var btnClick = document.getElementById('action_button')
clientErr.disabled = true;

clientName.onkeyup = () => {
 
    clickFormValidationCheck()
}

function clickFormValidationCheck(){ 
    var client_name = document.getElementById('client_name').value;

  
    if(client_name.length == 0){
        clientErr.innerHTML = 'Please Enter Name'
        clientErr.disabled = false;
    
        return false;
    }
  else if(client_name.length <= 3){
        clientErr.innerHTML = 'First Name Must be in 3 letters'
        clientErr.disabled = false;

        return false;
    }
   else if(!client_name.match(/^[a-zA-Z]/)){
        clientErr.innerHTML = 'Please Enter Valid Name';
        clientErr.disabled = false;

        return false;
    }

    clientErr.innerHTML ='';
    clientErr.disabled = true;    
}


var btnClick = document.getElementById('action_button')

    var clientErr = document.getElementById("clientError")
    
btnClick.onclick = () => {     
    clientErr.disabled = true;
    clickFormValidationCheck();
         
        if( clientErr.disabled == true ){ 
          return true;
        }else{
            return false;    
            }
}


 

