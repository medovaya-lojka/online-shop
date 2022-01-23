window.addEventListener('load', () => {
    updateCartListData();
    cartData = {
        operation: 'add',
        sessionId: getCookie('sessionId')
    };
})

const updateCartListData = () => {
    fetch(`/getCart?sessionId=${getCookie('sessionId')}`)
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

const fillCart = (productList) => {
    productList.forEach(product => {
        const productCard = document.getElementById('productContainerMain').cloneNode(true);
        productCard.id = `productCard${product.id}`;
        productCard.style.display = 'flex';
        productCard.querySelector('#productDeleteButton').setAttribute('data-product-id', productCard.id);
        productCard.querySelector('#productDeleteButton').setAttribute('data-quantity', product.quantity);
        productCard.querySelector('#size').innerHTML = `Размер: ${product.size.toUpperCase()}`;
        productCard.querySelector('#quantity').innerHTML = `Кол-во: ${product.quantity}`;
        productCard.querySelector('#color').innerHTML = `${product.colorName}`;
        productCard.querySelector('#productName').innerHTML = `${product.name}`;
        productCard.querySelector('#price').innerHTML = `${product.price*product.quantity} руб.`;
        productCard.querySelector('#productImg').src = product.imageList[0];
        productCard.querySelector('#productLink').href = `/productPage?id=${product.id}`
        document.getElementById('goodsContainer').appendChild(productCard);
    });
}

const deleteProduct = (e) => {
    let productId = e.attributes['data-product-id'].value;
    document.getElementById(productId).remove();
    cartData.operation = 'delete';
    cartData.productId = productId.split('productCard')[1];
    cartData.quantity = e.attributes['data-quantity'].value;
    set('/changeCart', cartData).then((data) => {
    });
    updateCartListData();
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