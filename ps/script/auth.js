const EYE_OPEN_ICON = "";
const EYE_CLOSED_ICON = "";

const switchForm = (n) => {
    if (n === "logIn") {
        document.getElementById("registerForm").style.display = "none";
        document.getElementById("logInForm").style.display = "block";
        document.getElementById("logInSwitch").classList.add("form-switch-active");
        document.getElementById("registerSwitch").classList.remove("form-switch-active");
    }
    if (n === "register") {
        document.getElementById("logInForm").style.display = "none";
        document.getElementById("registerForm").style.display = "block";
        document.getElementById("registerSwitch").classList.add("form-switch-active");
        document.getElementById("logInSwitch").classList.remove("form-switch-active");
    }
}

const passwordHandler = (e) => {
    if (e.value) {
        document.getElementById("iconEye").style.display = "block";
    } else {
        document.getElementById("iconEye").style.display = "none";
        lookPassword();
    }
}

const lookPassword = () => {
    if (document.getElementById("passwordInp").value && document.getElementById("iconEye").innerHTML.trim()=== EYE_OPEN_ICON) {
        document.getElementById("iconEye").innerHTML = EYE_CLOSED_ICON;
        document.getElementById("passwordInp").type = "text";
    } else if (document.getElementById("iconEye").innerHTML.trim() === EYE_CLOSED_ICON) {
        document.getElementById("iconEye").innerHTML = EYE_OPEN_ICON;
        document.getElementById("passwordInp").type = "password";
    }
}