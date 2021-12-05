let buttonCounter = 0;
let currentModalId;
let imageList = [];
const MAX_IMAGE_COUNT = 2;
let categoryList;
const washSymbolsList = [];
const sizeList = [];
let sizeCount = 0;
const washTitles = [
    "",
    "Обычная стирка при температуре воды до 30 °C",
    "Деликатная стирка при температуре воды до 30 °C",
    "Обычная стирка при температуре воды до 40 °C",
    "Деликатная стирка при температуре воды до 40 °C",
    "Обычная стирка при температуре воды до 60 °C",
    "Деликатная стирка при температуре воды до 60 °C",
    "Обычная стирка при температуре воды до 95 °C (допускается кипячение)",
    "Деликатная стирка при температуре воды до 95 °C",
    "Ручная стирка при температуре воды до 40 °C. Изделие не тереть. Отжимать аккуратно, без перекручивания",
    "Стирка запрещена",
    "Отбеливание разрешено хлорсодержащими отбеливателями",
    "Отбеливание запрещено",
    "Глажка при температуре подошвы утюга до 200 °C — соответствует символу в виде трёх точек на терморегуляторе утюга",
    "Глажка при температуре подошвы утюга до 150 °C — соответствует символу в виде двух точек на терморегуляторе утюга",
    "Глажка при температуре подошвы утюга до 110 °C — соответствует символу в виде одной точки на терморегуляторе утюга. Глажение с паром может вызвать необратимые повреждения обрабатываемого материала",
    "Глажка запрещена",
    "Сухая чистка допускается любыми растворителями",
    "Щадящая сухая чистка допускается любыми растворителями",
    "hhh",
    "hhh",
    "hhh",
    "hhh",
    "hhh",
    "hhh",
    "hhh",
    "hhh",
    
]

const closeModal = (id, shouldClean) => {
    document.getElementById(id).style.display = "none";
    if (shouldClean) {
        cleanForm();
    }
}

const openModal = (e, id) => {
    document.getElementById(id).style.display = "flex";
    if (e) {
        currentModalId = e.id;
    }

}

const copyAddButton = () => {
    
    if (buttonCounter < MAX_IMAGE_COUNT) {
        const imageButton = document.getElementById("addButton").cloneNode(true);
        imageButton.id = "addButton" + buttonCounter;
        imageButton.style.display = "block";
        document.getElementById("imageContainer").appendChild(imageButton);
        buttonCounter++;
    }   
}

const modalConfirm = (id) => {
    closeModal(id);
    const picURL = document.getElementById("picURL").value;
    const addCur = document.getElementById(currentModalId);
    if(picURL) {
        addCur.innerHTML = "";
        addCur.style.backgroundImage = `url(${picURL})`;
        imageList[buttonCounter-1] = picURL;
        copyAddButton();
    }
    document.getElementById("picURL").value = "";
}

window.addEventListener("load", () => {
    copyAddButton();
    document.getElementById("modal").addEventListener("mousedown", (e) => {
        e.stopPropagation();
    });
    updateCategorySelect();
    washIconsFill();
    sizeFill();
})

const sizeChange = (element) => {
    if (element.classList.contains('sizeValueActive')) {
        let i = element.id.split("sizeQuantity")[1];
        sizeList[i] = element.value;   
    }

}

const sizeButtonPick = (target) => {
    let element = target.parentElement;
    let i = element.value;
    if (element.classList.contains('sizeValueActive')) {
        element.classList.remove('sizeValueActive');
        document.getElementById(`sizeQuantity${i}`).disabled = true;
        sizeList[i] = 0;
        document.getElementById(`sizeQuantity${i}`).value = "";
    } else {
        element.classList.add('sizeValueActive');
        sizeList[i] = document.getElementById(`sizeQuantity${i}`).value;
        document.getElementById(`sizeQuantity${i}`).disabled = false;
    }
}

const sizeFill = () => {
    fetch('/getSizeList')
    .then(response => response.json())
    .then((data) => {
        data.forEach((size, index) => {
            const sizeButton = document.getElementById("sizeButton").cloneNode(true);
            sizeButton.id = `sizeButton${index}`;
            sizeButton.value = index;
            sizeButton.style.display = "flex";
            sizeButton.querySelector("#sizeValue").innerHTML = size;
            sizeButton.querySelector("#sizeQuantity").dataId = index;
            sizeButton.querySelector("#sizeQuantity").id = `sizeQuantity${index}`;
            document.getElementById("sizeContainer").appendChild(sizeButton);
        })
        sizeCount = data.length;
    });
}

const washIconsFill = () => {
    for (let i = 1; i <= 34; i++) {
        const imageButton = document.getElementById("iconWash").cloneNode(true);
        imageButton.innerHTML = '';
        const newImg = document.createElement("img");
        newImg.src = `/pictures/washSymbols/${i}@2x.png`;
        imageButton.id = "iconWash" + i;
        imageButton.value = i
        imageButton.style.display = "flex";
        imageButton.appendChild(newImg);
        document.getElementById("imageContainerWash").appendChild(imageButton);
        washSymbolsList[i] = false;
    }

}

const iconWashPick = (element) => {
    let i = element.value;
    if (element.classList.contains('iconWashActive')) {
        element.classList.remove('iconWashActive');
        washSymbolsList[i] = false;
    } else {
        element.classList.add('iconWashActive');
        washSymbolsList[i] = true;
    }
}

const cleanForm = () => {
    document.getElementById('adminPass').value = "";
    document.getElementById('name').value = "";
    document.getElementById('section').value = "1";
    document.getElementById('category').value = "1";
    document.getElementById('description').value = "";
    document.getElementById('composition').value = "";
    document.getElementById('colorName').value = "";
    document.getElementById('color').value = "#ffffff";
    for (let i = 0; i < sizeCount; i++) {
        document.getElementById(`sizeButton${i}`).classList.remove('sizeValueActive');
        document.getElementById(`sizeQuantity${i}`).value = "";
    }
    for (let i = 1; i <= 34; i++) {
        document.getElementById(`iconWash${i}`).classList.remove('iconWashActive');
        washSymbolsList[i] = false;
    }
    for (let i = 0; i < MAX_IMAGE_COUNT; i++) {
        document.getElementById(`addButton${i}`).remove();   
    }
    imageList = [];
    buttonCounter = 0;
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
    if (imageList.length !== 2) {
        return false;
    } 
    if (!washSymbolsList.includes(true)) {
        return false;
    }
    if (!document.getElementById("colorName").value) {
        return false;
    }
    return true;
}

const sendData = () => {
    if (checkFields()) {
        const positionData = {
            name: document.getElementById("name").value,
            section: document.getElementById("section").value,
            category: document.getElementById("category").value,
            sizeList: sizeList,
            description: document.getElementById("description").value,
            washSymbolsList: washSymbolsList,
            imageList: imageList,
            colorName: document.getElementById("colorName").value,
            color: document.getElementById("color").value,
            adminPass: document.getElementById("adminPass").value
        }
        set('/setPosition', positionData).then((data) => {
            openModal(null, 'modalContainerFinish');
    
            // fetch('/getPositionsList')
            //     .then(response => response.json())
            //     .then(data => console.log(data));
    
        });
    } else {
        openModal(null,"modalContainerError");
    }

} 

async function set(url, params) {
    const rawResponse = await fetch(url, {
        method: "POST",
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
        let categorySelect = document.getElementById("category");
        categorySelect.innerHTML = "";
        let curSection = document.getElementById("section").value;
        let valueIndex = 0;
        categoryList[curSection]["Одежда"].forEach((el) => {
            let option = document.createElement("option");
            option.value = valueIndex++;
            option.innerHTML = el;
            categorySelect.appendChild(option);
        });
        categoryList[curSection]["Аксессуары"].forEach((el) => {
            let option = document.createElement("option");
            option.value = valueIndex++;
            option.innerHTML = el;
            categorySelect.appendChild(option);
        });
    }
}