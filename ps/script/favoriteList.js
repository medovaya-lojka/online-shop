window.addEventListener('load', () => {
    if (isAuth) {
        document.getElementById('name').innerHTML = getCookie("name");
    }
    updateFavoriteListData();
    favoriteData = {
        operation: 'add',
        sessionId: getCookie('sessionId')
    };
})

const sizeFill = (product, productCard) => {
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
                    sizeButton.setAttribute('lack', true);
                } else {
                    sizeButton.innerHTML = size;
                }
                productCard.querySelector('#sizeContainer').appendChild(sizeButton);
            })
            sizeCount = data.length;
        });
}

const updateFavoriteListData = () => {
    fetch(`/getFavList?sessionId=${getCookie('sessionId')}`)
        .then(response => response.json())
        .then((data) =>  {
            updateFavorite(data);
        })
}

const updateFavorite = (productList) => {
    if (productList.length === 0) {
        document.getElementById('mainWithoutFavoriteContainer').style.display = 'flex';
        document.getElementById('mainFavoriteContainer').style.display = 'none';
        document.getElementById('detailsFavoriteContainer').style.display = 'none';
    } else {
        document.getElementById('mainWithoutFavoriteContainer').style.display = 'none';
        document.getElementById('mainFavoriteContainer').style.display = 'flex';
        document.getElementById('detailsFavoriteContainer').style.display = 'flex';
        fillFavorite(productList);
    }
}

const fillFavorite = (productList) => {
    productList.forEach(product => {
        const productCard = document.getElementById('productContainer').cloneNode(true);
        productCard.id = `productCard${product.id}`;
        productCard.style.display = 'block';
        productCard.querySelector('#productDeleteBut').setAttribute('data-product-id', productCard.id);
        productCard.querySelector('#shopButton').setAttribute('data-product-id', productCard.id);
        productCard.querySelector('#sizeContainer').setAttribute('data-product-id', productCard.id);
        productCard.querySelector('#sizeCloseButton').setAttribute('data-product-id', productCard.id);
        productCard.querySelector('#productName').innerHTML = `${product.name}`;
        productCard.querySelector('#productPrice').innerHTML = `${product.price} руб.`;
        productCard.querySelector('#productImg').src = product.imageList[0];
        productCard.querySelector('#productLink').href = `/productPage?id=${product.id}`
        document.getElementById('detailsFavoriteContainer').appendChild(productCard);
        sizeFill(product, productCard);
    });
}

const deleteFavorite = (e) => {
    let productId = e.attributes['data-product-id'].value;
    document.getElementById(productId).remove();
    favoriteData.operation = 'delete';
    favoriteData.productId = productId.split('productCard')[1];
    set('/changeFav', favoriteData).then((data) => {
    });
    updateFavoriteListData();
}

const shopButtonHandler = (e) => {
    let productCard = e.attributes['data-product-id'].value;
    document.getElementById(productCard).querySelector('#sizeContainer').style.display = 'flex';
}

const closeSizeContainer = (e) => {
    let productCard = e.attributes['data-product-id'].value; 
    document.getElementById(productCard).querySelector('#sizeContainer').style.display = 'none';
}

const addInCart = (e) => {
    if (!e.attributes['lack']) {
        let options = {
            operation: 'add',
            sessionId: getCookie('sessionId'),
            productId: e.parentElement.attributes['data-product-id'].value.split('productCard')[1],
            quantity: 1,
            size: e.innerHTML
        };
        set('/changeCart', options).then((data) => {
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