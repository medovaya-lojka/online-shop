let buttonCounter = 0;
let currentModalId;
let imageList = [];
const MAX_IMAGE_COUNT = 2;
let categoryList;
const washSymbolsList = [];
const sizeList = [];

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
})

const sizeButtonPick = (element) => {
    // let i = element.value;
    // if (element.classList.contains('sizeValueActive')) {
        // element.classList.remove('sizeValueActive');
        // sizeList[i] = 0;
        // document.getElementById(`sizeQuantity${i}`).value = "";
    // } else {
        // element.classList.add('sizeValueActive');
        // sizeList[i] = document.getElementById(`sizeQuantity${i}`).value;
    // }
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
    return true;
}

const sendData = () => {
    if (checkFields()) {
        const positionData = {
            name: document.getElementById("name").value,
            section: document.getElementById("section").value,
            category: document.getElementById("category").value,
            description: document.getElementById("description").value,
            washSymbolsList: washSymbolsList,
            imageList: imageList,
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