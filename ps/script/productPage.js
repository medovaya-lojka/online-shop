let sizeCount = 0;
let isSizeOpened = false;

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
}

const sizeSwitchHandler = () =>{
    if (isSizeOpened) {
        document.getElementById('sizeDropdownContainer').style.display = 'none';
        document.getElementById('sizeMainContainer').style.borderBottom  = '1px black solid';
        isSizeOpened = false;
        document.getElementById('iconChoiceButton').innerHTML = '';
    } else {
        document.getElementById('sizeDropdownContainer').style.display = 'block';
        document.getElementById('sizeMainContainer').style.borderBottom  = 'none';
        isSizeOpened = true;
        document.getElementById('iconChoiceButton').innerHTML = '';
    }
}

const sizePickHandler = (event) => {
    document.getElementById('sizeField').innerHTML = event.innerHTML.toUpperCase();
    sizeSwitchHandler();
}

window.addEventListener('load', () => {
    sizeFill();
})

const openFullImg = (id) => {
    document.getElementById('fullModal').style.display = 'block';
    document.getElementById('fullImg').src = product.imageList[id];
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
} 

const closeFullImg = () => {
    document.getElementById('fullModal').style.display = 'none';
    document.getElementsByTagName('body')[0].style.overflow = 'auto';
}

  