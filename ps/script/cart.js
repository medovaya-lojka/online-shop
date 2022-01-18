window.addEventListener('load', () => {
    updateCartListData();
})

const updateCartListData = () => {
    fetch(`/getCartList?sessionId=${getCookie('sessionId')}`)
        .then(response => response.json())
        .then((data) =>  {
            updateCart(data);
        })
}

const updateCart = (productList) => {
    if (productList.length === 0) {
        // document.getElementById('mainWithoutFavoriteContainer').style.display = 'flex';
        // document.getElementById('mainFavoriteContainer').style.display = 'none';
        // document.getElementById('detailsFavoriteContainer').style.display = 'none';
        console.log('ToDo: страница пустой корзины')
    } else {
        // document.getElementById('mainWithoutFavoriteContainer').style.display = 'none';
        // document.getElementById('mainFavoriteContainer').style.display = 'flex';
        // document.getElementById('detailsFavoriteContainer').style.display = 'flex';
        fillCart(productList);
    }
}

// const fillCart = (productList) => {
//     productList.forEach(product => {
//         const productCard = document.getElementById('productContainerMain').cloneNode(true);
//         productCard.id = `productCard${product.id}`;
//         productCard.style.display = 'block';
//         productCard.querySelector('#productDeleteBut').setAttribute('data-product-id', productCard.id);
//         productCard.querySelector('#size').innerHTML = `Размер: ${product.size}`;
//         productCard.querySelector('#sizeCloseButton').setAttribute('data-product-id', productCard.id);
//         productCard.querySelector('#productName').innerHTML = `${product.name}`;
//         productCard.querySelector('#productPrice').innerHTML = `${product.price} руб.`;
//         productCard.querySelector('#productImg').src = product.imageList[0];
//         productCard.querySelector('#productLink').href = `/productPage?id=${product.id}`
//         document.getElementById('detailsFavoriteContainer').appendChild(productCard);
//         sizeFill(product, productCard);
//     });
// }

// const deleteFavorite = (e) => {
//     let productId = e.attributes['data-product-id'].value;
//     document.getElementById(productId).remove();
//     favoriteData.operation = 'delete';
//     favoriteData.productId = productId.split('productCard')[1];
//     set('/changeFav', favoriteData).then((data) => {
//     });
//     updateFavoriteListData();
// }