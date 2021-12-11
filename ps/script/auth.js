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