let searchOpened = false;

const toggleSearch = () => {
    searchOpened = !searchOpened;
    if (searchOpened) {
        document.getElementById('iconSearch').innerHTML = '';
        document.getElementById('titleSearch').innerHTML = 'Закрыть';
        document.getElementById('searchContainer').style.display = 'flex';
        document.getElementById('sectionsContainer').style.display = 'none';
    } else {
        document.getElementById('iconSearch').innerHTML = '';
        document.getElementById('titleSearch').innerHTML = 'Поиск';
        document.getElementById('searchContainer').style.display = 'none';
        document.getElementById('sectionsContainer').style.display = 'flex';
    }
}

window.addEventListener('load', () => {
    if (isAuth) {
        document.getElementById('titleProfile').innerHTML = 'Личный кабинет';
        document.getElementById('authLink').href = '/profile'
    }
})