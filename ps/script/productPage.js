let sizeCount = 0;

const sizeFill = () => {
    fetch('/getSizeList')
        .then(response => response.json())
        .then((data) => {
            data.forEach((size, index) => {
                const sizeButton = document.getElementById('sizeButton').cloneNode(true);
                sizeButton.id = `sizeButton${index}`;
                sizeButton.value = product.sizeList[index];
                sizeButton.style.display = 'block';
                if (product.sizeList[index] < 1) {
                    sizeButton.innerHTML = `${size} — Нет в наличии!`;
                } else {
                    sizeButton.innerHTML = size;
                }
                document.getElementById('sizeDropdownContainer').appendChild(sizeButton);
            })
            sizeCount = data.length;
        });
    document.getElementById('sizeMainContainer').style.borderBottom  = 'none';

}

const openSize = () => {
    document.getElementById('sizeDropdownContainer').style.display = 'block';
    document.getElementById('sizeMainContainer').style.borderBottom  = 'none';
}

const closeSize = () => {
    document.getElementById('sizeDropdownContainer').style.display = 'none';
    document.getElementById('sizeMainContainer').style.borderBottom  = '1px black solid';
}



window.addEventListener('load', () => {
    sizeFill();
})