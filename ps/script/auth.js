const EYE_OPEN_ICON = '';
const EYE_CLOSED_ICON = '';
const redColor = 'rgb(243, 17, 17)';
const greenColor = 'rgb(29, 255, 57)';
const requiredCaption = 'Это обязательное поле.';
const redBorder = `1px ${redColor} solid`;
const loginList = {
    email: '',
    password: ''
};

const registerList = {
    name: '',
    email: '',
    password: ''
};

window.addEventListener('load', () => {
    document.getElementById('modal').addEventListener('mousedown', (e) => {
        e.stopPropagation();
    });
    document.getElementById('modalFillError').addEventListener('mousedown', (e) => {
        e.stopPropagation();
    });
    document.getElementById('modalError').addEventListener('mousedown', (e) => {
        e.stopPropagation();
    });
    document.getElementById('modalErrorRegister').addEventListener('mousedown', (e) => {
        e.stopPropagation();
    });
    document.getElementById('container').querySelectorAll('input').forEach((item) => {
        if (!item.attributes.exclude) {
            item.addEventListener('change', inputHandler);
            item.addEventListener('focusout', inputHandler);
        }
    })
})

const emailHandler = (e) => {
    const emailRem = e.nextSibling.nextSibling;
    if (!e.value) {
        emailRem.style.visibility = 'visible';
        e.style.borderBottom = redBorder;
        emailRem.innerHTML = requiredCaption;
    } else if (!validateEmail(e.value)) {
        emailRem.style.visibility = 'visible';
        e.style.borderBottom = redBorder;
        emailRem.innerHTML = 'Неправильный E-mail';
    } else {
        emailRem.style.visibility = 'hidden';
        e.style.borderBottom = '1px rgb(156, 156, 156) solid';
    }
}

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const closeModal = (id) => {
    document.getElementById(id).style.display = 'none';
}

const openModal = (id) => {
    document.getElementById(id).style.display = 'flex';
}

const repeatPassCheck = () => {
    const secondInp = document.getElementById('passwordRepeat');
    const firstInp = document.getElementById('password');
    const secondRem = secondInp.nextSibling.nextSibling;
    const firstRem = firstInp.nextSibling.nextSibling;
    const greenBorder = `1px ${greenColor} solid`;
    if (!firstInp.value && !secondInp.value) {
        secondRem.style.visibility = 'visible';
        secondRem.style.color = redColor;
        secondRem.innerHTML = requiredCaption;
        secondInp.style.borderBottom = redBorder;
        firstRem.style.visibility = 'visible';
        firstInp.style.borderBottom = redBorder;
        firstRem.innerHTML = requiredCaption;
        firstRem.style.color = redColor;
    } else if (secondInp.value === firstInp.value) {
        secondRem.style.visibility = 'visible';
        secondRem.style.color = greenColor;
        secondRem.innerHTML = 'Пароли совпадают';
        secondInp.style.borderBottom = greenBorder;
        firstInp.style.borderBottom = greenBorder;
        firstRem.style.visibility = 'hidden';
    } else if (firstInp.value && !secondInp.value) {
        firstRem.style.visibility = 'hidden';
        secondRem.style.visibility = 'visible';
        secondRem.style.color = redColor;
        secondRem.innerHTML = requiredCaption;
        secondInp.style.borderBottom = redBorder;
        firstInp.style.borderBottom = '1px rgb(156, 156, 156) solid';
    } else if (!firstInp.value) {
        firstRem.style.visibility = 'visible';
        firstInp.style.borderBottom = redBorder;
        firstRem.innerHTML = requiredCaption;
        firstRem.style.color = redColor;
        if(secondInp.value) {
            secondRem.style.visibility = 'visible';
            secondRem.innerHTML = 'Заполните поле "Пароль".';
            secondRem.style.color = redColor;
            secondInp.style.borderBottom = redBorder;
        }
    } else if (secondInp.value !== firstInp.value) {
        firstRem.style.visibility = 'hidden';
        firstInp.style.borderBottom = redBorder;
        secondRem.style.visibility = 'visible';
        secondRem.innerHTML = 'Пароли не совпадают.';
        secondRem.style.color = redColor;
        secondInp.style.borderBottom = redBorder;
    }
}

const inputHandler = (event) => {
    let e = event.currentTarget;
    if (!e.value) {
        if(e.attributes.complex)  {
            e.parentNode.nextSibling.nextSibling.style.visibility = 'visible';
        } else {
            e.nextSibling.nextSibling.style.visibility = 'visible';
        }
        e.style.borderBottom = '1px rgb(243, 17, 17) solid';
    } else {
        if(e.attributes.complex)  {
            e.parentNode.nextSibling.nextSibling.style.visibility = 'hidden';
        } else {
            e.nextSibling.nextSibling.style.visibility = 'hidden';
        }
        e.style.borderBottom = '1px rgb(156, 156, 156) solid';
    }
}

const switchForm = (n) => {
    if (n === 'logIn') {
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('logInForm').style.display = 'block';
        document.getElementById('logInSwitch').classList.add('form-switch-active');
        document.getElementById('registerSwitch').classList.remove('form-switch-active');
    }
    if (n === 'register') {
        document.getElementById('logInForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'block';
        document.getElementById('registerSwitch').classList.add('form-switch-active');
        document.getElementById('logInSwitch').classList.remove('form-switch-active');
    }
}

const passwordHandler = (e) => {
    if (e.value) {
        document.getElementById('iconEye').style.display = 'block';
    } else {
        document.getElementById('iconEye').style.display = 'none';
        showPassword();
    }
}

const showPassword = () => {
    if (document.getElementById('passwordInp').value && document.getElementById('iconEye').innerHTML.trim()=== EYE_OPEN_ICON) {
        document.getElementById('iconEye').innerHTML = EYE_CLOSED_ICON;
        document.getElementById('passwordInp').type = 'text';
    } else if (document.getElementById('iconEye').innerHTML.trim() === EYE_CLOSED_ICON) {
        document.getElementById('iconEye').innerHTML = EYE_OPEN_ICON;
        document.getElementById('passwordInp').type = 'password';
    }
}

let servResp = 0;

const logInButton = () => {
    if (!document.getElementById('email').value || !document.getElementById('passwordInp').value) {
        document.getElementById('modalHeaderErrorText').innerHTML = 'Заполните все поля.';
        openModal('modalContainerFillError');
    } else {
        loginList['email'] = document.getElementById('email').value;
        loginList['password'] = document.getElementById('passwordInp').value;
        console.log(loginList);
        set('/login', loginList).then((data) => {
            console.log(data)
            if (data.success) {
                console.log('Todo: Переход на страницу профиля');
                setCookie('sessionId', data.sessionId);
                setCookie('name', data.name);
            } else {
                openModal('modalContainerError');
            }
        });
    }

}

const checkRegisterFields = () => {
    if (!document.getElementById('name').value) {
        return false;
    }
    if (!document.getElementById('emailReg').value) {
        return false;
    }
    if (!document.getElementById('password').value) {
        return false;
    }
    if (!document.getElementById('passwordRepeat').value) {
        return false;
    }
    return true;
}

const registerButton = () => {
    if (!checkRegisterFields()) {
        document.getElementById('modalHeaderErrorText').innerHTML = 'Заполните все поля.';
        openModal('modalContainerFillError');
    } else if(!validateEmail(email)) {
        document.getElementById('modalHeaderErrorText').innerHTML = 'Неправильный E-mail.';
        openModal('modalContainerFillError');
    } else if (document.getElementById('password').value !== document.getElementById('passwordRepeat').value) {
        document.getElementById('modalHeaderErrorText').innerHTML = 'Пароли не совпадают.';
        openModal('modalContainerFillError');
    } else {
        registerList['name'] = document.getElementById('name').value;
        registerList['email'] = document.getElementById('emailReg').value;
        registerList['password'] = document.getElementById('password').value;
        set('/register', registerList).then((data) => {
            console.log(data)
            if (data.success) {
                console.log('Todo: Переход на страницу профиля');
            } else {
                openModal('modalContainerErrorRegister');
            }
        });
    }
}

async function set(url, params) {
    const rawResponse = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    });

    return await rawResponse.json();
}

