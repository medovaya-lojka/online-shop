const EYE_OPEN_ICON = "";
const EYE_CLOSED_ICON = "";

window.addEventListener('load', () => {
    document.getElementById("container").querySelectorAll("input").forEach((item) => {
        if (!item.attributes.repeat) {
            item.addEventListener("change", inputHandler);
            item.addEventListener("focusout", inputHandler);
        }
    })
})

const repeatPassCheck = () => {
    const secondInp = document.getElementById("passwordRepeat");
    const firstInp = document.getElementById("password");
    const secondRem = secondInp.nextSibling.nextSibling;
    const firstRem = firstInp.nextSibling.nextSibling;
    const redColor = "rgb(243, 17, 17)";
    const greenColor = "rgb(29, 255, 57)";
    const requiredCaption = "Это обязательное поле.";
    const redBorder = `1px ${redColor} solid`;
    const greenBorder = `1px ${greenColor} solid`;
    if (!firstInp.value && !secondInp.value) {
        secondRem.style.visibility = "visible";
        secondRem.style.color = redColor;
        secondRem.innerHTML = requiredCaption;
        secondInp.style.borderBottom = redBorder;
        firstRem.style.visibility = "visible";
        firstInp.style.borderBottom = redBorder;
        firstRem.innerHTML = requiredCaption;
        firstRem.style.color = redColor;
    } else if (secondInp.value === firstInp.value) {
        secondRem.style.visibility = "visible";
        secondRem.style.color = greenColor;
        secondRem.innerHTML = "Пароли совпадают";
        secondInp.style.borderBottom = greenBorder;
        firstInp.style.borderBottom = greenBorder;
        firstRem.style.visibility = "hidden";
    } else if (firstInp.value && !secondInp.value) {
        firstRem.style.visibility = "hidden";
        secondRem.style.visibility = "visible";
        secondRem.style.color = redColor;
        secondRem.innerHTML = requiredCaption;
        secondInp.style.borderBottom = redBorder;
        firstInp.style.borderBottom = "1px rgb(156, 156, 156) solid";
    } else if (!firstInp.value) {
        firstRem.style.visibility = "visible";
        firstInp.style.borderBottom = redBorder;
        firstRem.innerHTML = requiredCaption;
        firstRem.style.color = redColor;
        if(secondInp.value) {
            secondRem.style.visibility = "visible";
            secondRem.innerHTML = "Заполните поле 'Пароль'.";
            secondRem.style.color = redColor;
            secondInp.style.borderBottom = redBorder;
        }
    } else if (secondInp.value !== firstInp.value) {
        firstRem.style.visibility = "hidden";
        firstInp.style.borderBottom = redBorder;
        secondRem.style.visibility = "visible";
        secondRem.innerHTML = "Пароли не совпадают.";
        secondRem.style.color = redColor;
        secondInp.style.borderBottom = redBorder;
    }
}

const inputHandler = (event) => {
    let e = event.currentTarget;
    if (!e.value) {
        if(e.attributes.complex)  {
            e.parentNode.nextSibling.nextSibling.style.visibility = "visible";
        } else {
            e.nextSibling.nextSibling.style.visibility = "visible";
        }
        e.style.borderBottom = "1px rgb(243, 17, 17) solid";
    } else {
        if(e.attributes.complex)  {
            e.parentNode.nextSibling.nextSibling.style.visibility = "hidden";
        } else {
            e.nextSibling.nextSibling.style.visibility = "hidden";
        }
        e.style.borderBottom = "1px rgb(156, 156, 156) solid";
    }
}

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

