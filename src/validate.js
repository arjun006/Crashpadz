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
    var regEmail = document.getElementById("email-reg");
    var emailError = document.getElementById("email-error");
    emailError.innerHTML = "";
    if(regex.test(regEmail)){
        emailError.innerHTML += "<p>Looks good!</p>";
    } else {
        
        emailError.innerHTML += "<p>Enter a valid email.</p>";
        isValidReg=false;
        
    }

    return isValidReg;
}