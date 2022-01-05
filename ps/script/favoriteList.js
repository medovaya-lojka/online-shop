window.addEventListener('load', () => {
    if (isAuth) {
        document.getElementById('name').innerHTML = getCookie("name");
    }
})