function toggleVisibility() {  
    var getPasword = document.getElementById("password");  
    if (getPasword.type === "password") {  
        getPasword.type = "text";  
    } else {  
        getPasword.type = "password";  
    }  
    }  