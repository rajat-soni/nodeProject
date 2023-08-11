var cname = document.getElementById('cname');
var camp_name = document.getElementById('camp_name');
var camp_from = document.getElementById('camp_from');
var blast_count = document.getElementById('blast_count');
var priority = document.getElementById('priority');
var allocated_to = document.getElementById('allocated_to');
var tact = document.getElementById('tact');
var blast_type = document.getElementById('blast_type');
var comment = document.getElementById('comment');
var ebasset_nameview = document.getElementById('ebasset_nameview');


var cname_error = document.getElementById('cname_error')
var camp_name_error = document.getElementById('camp_error');
var camp_from_error = document.getElementById('camp_from_error');
var blast_error = document.getElementById('blast_error');
var error_priority = document.getElementById('error_priority');
var error_allocated = document.getElementById('error_allocated');
var error_Tact = document.getElementById('error_Tact');
var error_blast_type = document.getElementById('error_blast_type');
var comment_error = document.getElementById('comment-error');
//var eblast_error = document.getElementById('eblast_error');



cname_error.disabled = true;
camp_name_error.disabled = true;
camp_from_error.disabled = true;
blast_error.disabled = true;
error_priority.disabled = true;
error_allocated.disabled = true;
error_Tact.disabled = true;
error_blast_type.disabled = true;
comment_error.disabled= true;
//eblas_error.disabled = true;



// ebasset_nameview.onkeyup = () => {
   
// eblastValidation();
// }

// function eblastValidation() {

//     var ebasset_nameview = document.getElementById('ebasset_nameview').value;
//        alert(ebasset_nameview);
//     if(ebasset_nameview.length <=2){
//         eblast_error.innerHTML = 'comment Must be in 2 letters'
//         eblast_error.disabled = false;
//         return false;
//     }

//     if(ebasset_nameview.length == 0){
//         eblast_error.innerHTML = 'Please Enter Name'
//         eblast_error.disabled = false; 
//         return false;
//     }
//     if(!ebasset_nameview.match(/^[a-zA-Z]/)){
//         eblast_error.innerHTML = 'Please Enter Valid Name';
//         eblast_error.disabled = false;
//         return false;
//     }

//     eblast_error.innerHTML ='';
//     eblast_error.disabled = true;    
//} //end of camp_name //





comment.onkeyup = () => {
    commentValidation();
}
var comment_new= document.getElementById('comment');

function commentValidation () {  // defination of function //
    var comment = document.getElementById('comment').value;

    if(comment.length <= 10){
        comment_error.innerHTML = 'Comment Must be less in 10 letters'
        comment_error.disabled = false;
        comment_new.style.borderColor = "black";

        return false;

    }

    if(comment.length == 0){
        comment_error.innerHTML = 'Please Enter Name'
        comment_error.disabled = false; 
        comment_new.style.borderColor = "black";

        return false;
    }
    // if(!comment.match(/^[a-zA-Z]/)){
    //     comment_error.innerHTML = 'Please Enter Valid Name';
    //     comment_error.disabled = false;
    //     return false;
    // }

    comment_error.innerHTML ='';
    comment_error.disabled = true; 
    comment_new.style.borderColor = "green";
   
} //end of camp_name //













blast_type.onchange = () => {
    blast_typeValidation();
}
var blast_type_new= document.getElementById('blast_type');

 function  blast_typeValidation()  {

    var blast_type = document.getElementById('blast_type');
    if(blast_type.value  == "Please select one"){
        error_blast_type.disabled = false;
        error_blast_type.innerHTML = 'Please select one value'
        blast_type_new.style.borderColor = "black";

        return false;
    }else{
        error_blast_type.disabled= true;
        error_blast_type.innerHTML = '';
        blast_type_new.style.borderColor = "green";

        
    }error_Tact
}









tact.onchange = () => {
    tactValidation();
}
var tact_new= document.getElementById('tact');

 function tactValidation () {

    var tact = document.getElementById('tact');
    if(tact.value  == "Please select one"){
        error_Tact.disabled = false;
        error_Tact.innerHTML = 'Please select one value'
        tact_new.style.borderColor = "black";

        return false;
    }else{
        error_Tact.disabled= true;
        error_Tact.innerHTML = '';
        tact_new.style.borderColor = "green";

        
    }
}






allocated_to.onchange = () => {
    allocatedToValidation();
}
var allocated_to_new= document.getElementById('allocated_to');

 function allocatedToValidation () {

    var allocated_to = document.getElementById('allocated_to');
    if(allocated_to.value  == "Please select one"){
        error_allocated.disabled = false;
        error_allocated.innerHTML = 'Please select one value'
        allocated_to_new.style.borderColor = "black";

        return false;
    }else{
        error_allocated.disabled = true;
        error_allocated.innerHTML = '';
        allocated_to_new.style.borderColor = "green";

        
    }
}


 










priority.onchange = () => {
    priorityValidation()
}

var priority_new = document.getElementById('priority');

 function priorityValidation () {

    var priority = document.getElementById('priority');
    if(priority.value  == "Please select one"){
        error_priority.disabled = false;
        error_priority.innerHTML = 'Please select one value'
        priority_new.style.borderColor = "black";
        return false;
    }else{
        error_priority.disabled = true;
        error_priority.innerHTML = '';
        priority_new.style.borderColor = "black";
        
    }
}



 




blast_count.onkeyup = () => {
    blastCountValidation();
}
var blast_count_new = document.getElementById('blast_count');

function blastCountValidation () {  // defination of function //
    var blast_count = document.getElementById('blast_count').value;


    if(blast_count.length == 0){
        blast_error.innerHTML = ' Blast count not be empty'
        blast_error.disabled = false; 
        blast_count_new.style.borderColor = "black";

        return false;
    }
    // if(!camp_from.match(/[0-9]/)){
    //     blast_error.innerHTML = 'Please Enter Valid ';
    //     blast_error.disabled = false;
    //     return false;
    // }

    blast_error.innerHTML ='';
    blast_error.disabled = true;  
    blast_count_new.style.borderColor = "green";
  
} //end of camp_name //







camp_from.onkeyup = () => {
    campFromValidation();
}
var camp_from_new = document.getElementById('camp_from');

function campFromValidation () {  // defination of function //
    var camp_from = document.getElementById('camp_from').value;

    if(camp_from.length <= 3){
        camp_from_error.innerHTML = 'Campaign from Must be in 2 letters'
        camp_from_error.disabled = false;
        camp_from_new.style.borderColor = "black";
        return false;
    }

    if(camp_from.length == 0){
        camp_from_error.innerHTML = 'Please Enter Name'
        camp_from_error.disabled = false; 
        camp_from_new.style.borderColor = "black";
        return false;
    }
    if(!camp_from.match(/^[a-zA-Z]/)){
        camp_from_error.innerHTML = 'Please Enter Valid Name';
        camp_from_error.disabled = false;
        camp_from_new.style.borderColor = "black";
        return false;
    }

    camp_from_error.innerHTML ='';
    camp_from_error.disabled = true;  
    camp_from_new.style.borderColor = "green";  
} //end of camp_name //




camp_name.onkeyup = () => {

    campNameValidation();
 }
 var camp_name_new = document.getElementById('camp_name');

function campNameValidation () {  // defination of function //
    var camp_name_value = document.getElementById('camp_name').value;

    if(camp_name_value.length <= 2){
        camp_name_error.innerHTML = 'Campaign Name Must be in 2 letters'
        camp_name_error.disabled = false;
        camp_name_new.style.borderColor = "black";
        return false;
    }

    if(camp_name_value.length == 0){
        camp_name_error.innerHTML = 'Please Enter Name'
        camp_name_error.disabled = false; 
        camp_name_new.style.borderColor = "black";
        
        return false;
    }
    // if(!camp_name_value.match(/^[a-zA-Z]/)){
    //     camp_name_error.innerHTML = 'Please Enter Valid Name';
    //     camp_name_error.disabled = false;
    //     camp_name_new.style.borderColor = "black";
    //     return false;
    // }

    camp_name_error.innerHTML ='';
    camp_name_error.disabled = true;  
    camp_name_new.style.borderColor = "green";  
} //end of camp_name //


cname.onchange = () => {

nameValidation();

}

var cname_new = document.getElementById('cname');

function nameValidation() { // client name funcion start 

    var cname = document.getElementById('cname');
    if(cname.value  == "Please select one"){
        cname_error.disabled = false;
		cname_new.style.borderColor = "black";
        cname_error.innerHTML = 'Please select one value'
        return false;
    }else{
        cname_error.disabled = true;
        cname_error.innerHTML = '';
		cname_new.style.borderColor = "green";
        
    }
} // client name funcion end 

var btnClick = document.getElementById('action_button');
var camp_name_error = document.getElementById('camp_error');

btnClick.onclick = () => {
    cname_error.disabled = true;
    camp_name_error.disabled = true;
    camp_from_error.disabled = true;
    blast_error.disabled = true;
    error_priority.disabled = true;
    error_allocated.disabled = true;
    error_Tact.disabled = true;
    error_blast_type.disabled = true;
    comment_error.disabled = true;    
    

    nameValidation();
    campNameValidation();
    blastCountValidation();
    priorityValidation();
    allocatedToValidation()
    tactValidation();
    blast_typeValidation();
    commentValidation();
    campFromValidation();
    

    if( ( cname_error.disabled == true) && ( camp_name_error.disabled == true ) && (camp_from_error.disabled ==  true) && (  blast_error.disabled == true) && (error_priority.disabled == true) && ( error_allocated.disabled == true) && (  error_Tact.disabled == true
        ) && (error_blast_type.disabled == true) && ( comment_error.disabled == true) ) {
        return true;
    }else{
        return false;
    }
}
