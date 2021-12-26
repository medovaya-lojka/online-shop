window.addEventListener('load', () => {
    if (isAuth) {
        document.getElementById('name').innerHTML = getCookie("name");
    }
})

const logOut = () => {
    deleteCookie('name');
    deleteCookie('sessionId');
    isAuth = false;
    window.location.href = "/";
}