function loginValidator() {
    var isValid = true;
    var email = document.getElementById("email-login").value;
    var pass = document.getElementById("login-password").value;
    var emailTrim = email.trim();
    var passTrim = pass.trim();
    var emailErr = document.getElementById("login-error");
    var passErr = document.getElementById("password-error")
    emailErr.innerHTML="";
    passErr.innerHTML=""
    if(emailTrim == ""){
        emailErr.innerHTML += '<p>Invalid email entry.</p>'
        isValid=false;
    }
    else if(passTrim == ""){
        passErr.innerHTML += '<p>Invalid password.</p>'
        isValid = false;
    }
    return isValid;
}



function regValidator() {
    const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const passRegex =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,22}$/ ;
    var isValidReg = true;
    var regEmail = document.getElementById("email-reg").value;
    var regPass = document.getElementById("reg-password").value;
    var emailError = document.getElementById("email-error");
    var emailValid = document.getElementById("email-valid");
    var passError = document.getElementById("pass-error");
    var passValid = document.getElementById("pass-valid");
    passError.innerHTML = "";
    passValid.innerHTML = "";
    emailError.innerHTML = "";
    emailValid.innerHTML = "";
    if(!regex.test(regEmail)){
       
        emailError.innerHTML += "<p>Enter a valid email.</p>";
        isValidReg=false;  
       
    } else {
        emailValid.innerHTML += "<p>Looks good!</p>";
    }
    if(passRegex.test(regPass)){
        passValid.innerHTML += "<p>Looks good!</p>"
    } else {
        passError.innerHTML += "<p>Enter a valid password. Atleast 1 uppercase letter and atleast 1 number.</p>";
        isValidReg=false; 
    }

    return isValidReg;
}