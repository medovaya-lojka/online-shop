window.addEventListener('load', () => {
    if (isAuth) {
        document.getElementById('name').innerHTML = getCookie("name");
    }
    fetch(`/getFavList?sessionId=${getCookie('sessionId')}`)
    .then(response => response.json())
    .then((data) =>  {
        updateFavorite(data);
    })
})

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
        productCard.querySelector('#productDeleteBut')['data-product-id'] = productCard.id;
        productCard.querySelector('#shopButton')['data-product-id'] = productCard.id;
        productCard.querySelector('#productName').innerHTML = `${product.name}`;
        productCard.querySelector('#productPrice').innerHTML = `${product.price} руб.`;
        productCard.querySelector('#productImg').src = product.imageList[0];
        document.getElementById('detailsFavoriteContainer').appendChild(productCard);
    });
}