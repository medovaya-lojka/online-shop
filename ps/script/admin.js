let buttonCounter = 0;
let currentModalId;
const imageList = [];
const MAX_IMAGE_COUNT = 2;
let categoryList;

const closeModal = () => {
    document.getElementById("modalContainer").style.display = "none";
}

const openModal = (e) => {
    document.getElementById("modalContainer").style.display = "flex";
    console.log(e);
    currentModalId = e.id;
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

const modalConfirm = () => {
    closeModal();
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

const washIconsFill = () => {
    for (let i = 1; i <= 34; i++) {
        const imageButton = document.getElementById("iconWash").cloneNode(true);
        imageButton.innerHTML = '';
        const newImg = document.createElement("img");
        newImg.src = `/pictures/washSymbols/${i}@2x.png`;
        imageButton.id = "iconWash" + i;
        imageButton.style.display = "block";
        imageButton.appendChild(newImg);
        document.getElementById("imageContainerWash").appendChild(imageButton);
    }

}

const sendData = () => {
    const positionData = {
        name: document.getElementById("name").value,
        section: document.getElementById("section").value,
        category: document.getElementById("category").value,
        description: document.getElementById("description").value,
        imageList: imageList,
        adminPass: document.getElementById("adminPass").value
    }
    set('/setPosition', positionData).then((data) => {
        fetch('/getPositionsList')
            .then(response => response.json())
            .then(data => console.log(data));
    });
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
        categoryList[curSection]["Одежда"].forEach((el, index) => {
            let option = document.createElement("option");
            option.value = index;
            option.innerHTML = el;
            categorySelect.appendChild(option);
        });
        categoryList[curSection]["Аксессуары"].forEach((el, index) => {
            let option = document.createElement("option");
            option.value = index;
            option.innerHTML = el;
            categorySelect.appendChild(option);
        });
    }
}