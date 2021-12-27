let buttonCounter = 0;
let currentModalId;
let imageList = [];
const MAX_IMAGE_COUNT = 2;
const LAST_ICON_ID = 34;
let categoryList;
const washSymbolsList = [];
const sizeList = [];
let sizeCount = 0;
const washTitles = [
    '',
    'Обычная стирка при температуре воды до 30 °C',
    'Деликатная стирка при температуре воды до 30 °C',
    'Обычная стирка при температуре воды до 40 °C',
    'Деликатная стирка при температуре воды до 40 °C',
    'Обычная стирка при температуре воды до 60 °C',
    'Деликатная стирка при температуре воды до 60 °C',
    'Обычная стирка при температуре воды до 95 °C (допускается кипячение)',
    'Деликатная стирка при температуре воды до 95 °C',
    'Ручная стирка при температуре воды до 40 °C. Изделие не тереть. Отжимать аккуратно, без перекручивания',
    'Стирка запрещена',
    'Отбеливание разрешено хлорсодержащими отбеливателями',
    'Отбеливание запрещено',
    'Глажка при температуре подошвы утюга до 200 °C — соответствует символу в виде трёх точек на терморегуляторе утюга',
    'Глажка при температуре подошвы утюга до 150 °C — соответствует символу в виде двух точек на терморегуляторе утюга',
    'Глажка при температуре подошвы утюга до 110 °C — соответствует символу в виде одной точки на терморегуляторе утюга. Глажение с паром может вызвать необратимые повреждения обрабатываемого материала',
    'Глажка запрещена',
    'Сухая чистка допускается любыми растворителями',
    'Деликатная сухая чистка для символа «A»',
    'Обычная сухая чистка с использованием углеводородов, температура кипения (дистилляции, перегонки) которых составляет 150—210 °C, а температура воспламенения — 38—60 °C',
    'Деликатная сухая чистка для символа «F»',
    'Обычная сухая чистка с использованием тетрахлорэтилена и углеводородов, температура кипения (дистилляции, перегонки) которых составляет 150—210 °C, а температура воспламенения — 38—60 °C',
    'Деликатная сухая чистка для символа «P»',
    'Сухая чистка запрещена',
    'Барабанная сушка разрешена',
    'Барабанная сушка запрещена',
    'Сушка на горизонтальной плоскости в расправленном состоянии',
    'Сушка без отжима в вертикальном положении',
    'Сушка в вертикальном положении',
    'Профессиональная чистка',
    'Стирка',
    'Деликатная стирка',
    'Отбеливание',
    'Деликатная барабанная сушка при пониженной температуре 60 °C, уменьшенных продолжительности сушки и количестве загруженного белья',
    'Обычная барабанная сушка при температуре 80 °C'
]

const closeModal = (id, shouldClean) => {
    document.getElementById(id).style.display = 'none';
    if (shouldClean) {
        cleanForm();
    }
}

const openModal = (e, id) => {
    document.getElementById(id).style.display = 'flex';
    if (e) {
        currentModalId = e.id;
        document.getElementById('picURL').focus();
    }
}

const copyAddButton = () => {
    if (buttonCounter < MAX_IMAGE_COUNT) {
        const imageButton = document.getElementById('addButton').cloneNode(true);
        imageButton.id = `addButton${buttonCounter}`;
        imageButton.style.display = 'block';
        document.getElementById('imageContainer').appendChild(imageButton);
        buttonCounter++;
    }
}

const modalConfirm = (id) => {
    closeModal(id);
    const picURL = document.getElementById('picURL').value;
    const addCur = document.getElementById(currentModalId);
    if (picURL) {
        addCur.innerHTML = '';
        addCur.style.backgroundImage = `url(${picURL})`;
        imageList[buttonCounter - 1] = picURL;
        copyAddButton();
    }
    document.getElementById('picURL').value = '';
}

window.addEventListener('load', () => {
    copyAddButton();
    document.getElementById('modal').addEventListener('mousedown', (e) => {
        e.stopPropagation();
    });
    updateCategorySelect();
    washIconsFill();
    sizeFill();
})

const sizeChange = (element) => {
    let elIndex = element.id.split('sizeQuantity')[1];
    sizeList[elIndex] = element.value;
}

const sizeButtonPick = (target) => {
    let element = target.parentElement;
    let elIndex = element.value;
    if (element.classList.contains('sizeValueActive')) {
        element.classList.remove('sizeValueActive');
        document.getElementById(`sizeQuantity${elIndex}`).disabled = true;
        sizeList[elIndex] = 0;
        document.getElementById(`sizeQuantity${elIndex}`).value = '';
    } else {
        element.classList.add('sizeValueActive');
        sizeList[elIndex] = document.getElementById(`sizeQuantity${elIndex}`).value;
        document.getElementById(`sizeQuantity${elIndex}`).disabled = false;
    }
}

const sizeFill = () => {
    fetch('/getSizeList')
        .then(response => response.json())
        .then((data) => {
            data.forEach((size, index) => {
                const sizeButton = document.getElementById('sizeButton').cloneNode(true);
                sizeButton.id = `sizeButton${index}`;
                sizeButton.value = index;
                sizeButton.style.display = 'flex';
                sizeButton.querySelector('#sizeValue').innerHTML = size;
                sizeButton.querySelector('#sizeQuantity').dataId = index;
                sizeButton.querySelector('#sizeQuantity').id = `sizeQuantity${index}`;
                document.getElementById('sizeContainer').appendChild(sizeButton);
            })
            sizeCount = data.length;
        });
}

const washIconsFill = () => {
    for (let i = 1; i <= LAST_ICON_ID; i++) {
        const imageButton = document.getElementById('iconWash').cloneNode(true);
        imageButton.innerHTML = '';
        const newImg = document.createElement('img');
        newImg.src = `/pictures/washSymbols/${i}@2x.png`;
        imageButton.id = 'iconWash' + i;
        imageButton.value = i;
        imageButton.title = washTitles[i];
        imageButton.style.display = 'flex';
        imageButton.appendChild(newImg);
        document.getElementById('imageContainerWash').appendChild(imageButton);
        washSymbolsList[i] = false;
    }

}

const iconWashPick = (element) => {
    let elIndex = element.value;
    if (element.classList.contains('iconWashActive')) {
        element.classList.remove('iconWashActive');
        washSymbolsList[elIndex] = false;
    } else {
        element.classList.add('iconWashActive');
        washSymbolsList[elIndex] = true;
    }
}

const cleanForm = () => {
    document.getElementById('adminPass').value = '';
    document.getElementById('name').value = '';
    document.getElementById('section').value = '1';
    document.getElementById('category').value = '0';
    document.getElementById('description').value = '';
    document.getElementById('composition').value = '';
    document.getElementById('colorName').value = '';
    document.getElementById('color').value = '#ffffff';
    document.getElementById('price').value = '';
    for (let i = 0; i < sizeCount; i++) {
        document.getElementById(`sizeButton${i}`).classList.remove('sizeValueActive');
        document.getElementById(`sizeQuantity${i}`).value = '';
        document.getElementById(`sizeQuantity${i}`).disabled = true;
    }
    for (let i = 1; i <= LAST_ICON_ID; i++) {
        document.getElementById(`iconWash${i}`).classList.remove('iconWashActive');
        washSymbolsList[i] = false;
    }
    for (let i = 0; i < MAX_IMAGE_COUNT; i++) {
        document.getElementById(`addButton${i}`).remove();
    }
    imageList = [];
    buttonCounter = 0;
    copyAddButton();
}

const checkFields = () => {
    if (!document.getElementById('adminPass').value) {
        return false;
    }
    if (!document.getElementById('name').value) {
        return false;
    }
    if (!document.getElementById('description').value) {
        return false;
    }
    if (!document.getElementById('composition').value) {
        return false;
    }
    if (imageList.length !== MAX_IMAGE_COUNT) {
        return false;
    }
    if (!washSymbolsList.includes(true)) {
        return false;
    }
    if (!document.getElementById('colorName').value) {
        return false;
    }
    if (!document.getElementById('price').value) {
        return false;
    }
    return true;
}

const sendData = () => {
    if (checkFields()) {
        const positionData = {
            name: document.getElementById('name').value,
            price: document.getElementById('price').value,
            section: document.getElementById('section').value,
            category: document.getElementById('category').value,
            sizeList: sizeList,
            description: document.getElementById('description').value,
            composition: document.getElementById('composition').value,
            washSymbolsList: washSymbolsList,
            imageList: imageList,
            colorName: document.getElementById('colorName').value,
            color: document.getElementById('color').value,
            adminPass: document.getElementById('adminPass').value
        }
        set('/setPosition', positionData).then((data) => {
            openModal(null, 'modalContainerFinish');

            // fetch('/getPositionsList')
            //     .then(response => response.json())
            //     .then(data => console.log(data));

        });
    } else {
        openModal(null, 'modalContainerError');
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

const updateCategorySelect = () => {
    if (!categoryList) {
        fetch('/getCategoryList')
            .then(response => response.json())
            .then((data) => {
                categoryList = data;
                updateCategorySelect();
            });
    } else {
        let categorySelect = document.getElementById('category');
        categorySelect.innerHTML = '';
        let curSection = document.getElementById('section').value;
        let valueIndex = 0;
        for (const key in categoryList[curSection]) {
            categoryList[curSection][key].forEach((el) => {
                let option = document.createElement('option');
                option.value = valueIndex++;
                option.innerHTML = el;
                categorySelect.appendChild(option);
            });
        }
    }
}