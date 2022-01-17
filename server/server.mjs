import { startServer } from './start.mjs';
import { Database } from './db.mjs';
import CryptoJS from 'crypto-js/aes.js';
import enc from 'crypto-js/enc-utf8.js';


const PORT = 9000;
const app = startServer(PORT);
const db = new Database();
await db.init();
await db.getData();

app.get('/', (req, res) => {
    res.render('main');
})

app.get('/test-api', (req, res) => {
    res.send({success: true});
})

app.get('/getPositionsList', async (req, res) => {
    res.send(await db.getData('positions'));
})

app.get('/getCategoryList', async (req, res) => {
    res.send(await db.getData('categories'));
})

app.get('/getSizeList', async (req, res) => {
    res.send(await db.getData('sizes'));
})

const getRandomInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

app.post('/setPosition', async (req, res) => {
    let isIdValid = false;
    let randId;
    if(db.isAdminSessionValid(req.body.sessionId)) {
        while (!isIdValid) {
            randId = getRandomInRange(1000000, 10000000);
            if (!(await db.getPosition(randId))) {
                isIdValid = true;
            }
        }
        console.log(true)
        req.body.id = randId;
        db.push('positions', req.body);
        res.send({success: true, id: randId});
    } else {
        res.send({
                success: false,
                error: 'auth error'
            });
    }

})

app.get('/admin', (req, res) => {
    res.render('admin');
})

app.get('/auth', (req, res) => {
    res.render('auth');
})

app.get('/profile', (req, res) => {
    res.render('profile');
})

app.get('/productPage', async (req, res) => {
    const curPos = await db.getPosition(req.query.id);
    console.log(curPos);
    if(curPos) {
        res.render('productPage', {product: curPos});
    } else {
        res.render('errorPage', {id: 404});
    }
})


const getRandSessionId = () => {
    return Math.random().toString(36).substr(2);
}

const SECRET_KEY = 'testSecretKey';
app.post('/register', async (req, res) => {
    if (await db.findUser(req.body.email)) {
        res.send({
            success: false,
            error: 'user already registered'
        });
        return;
    }
    req.body.password = CryptoJS.encrypt(req.body.password, SECRET_KEY).toString();
    req.body.lastSessionId = getRandSessionId();
    await db.push('users', req.body);
    res.send({success: true, id: req.body.lastSessionId});
})

const decryptUserPass = (cipherText) => {
    return enc.stringify(CryptoJS.decrypt(cipherText, SECRET_KEY));
}

app.post('/changeFav', async (req, res) => {
    let result;
    if(req.body.operation === "delete") {
        result = await db.removeFavToUserBySessionId(req.body.sessionId, Number(req.body.productId));
    } else {
        result = await db.addFavToUserBySessionId(req.body.sessionId, Number(req.body.productId));
    }
    if (result === -1) {
        res.send({
            success: false
        })
    } else {
        res.send({
            success: true
        })
    }
})

app.get('/getFavList', async (req, res) => {
    let favList = db.findUserBySessionId(req.query.sessionId).favList;
    let result = [];
    for(let i = 0; i < favList.length; i++) {
        let product = await db.getPosition(favList[i]);
        result.push(product);
    }
    res.send(result);
})

app.post('/changeCart', async (req, res) => {
    let result;
    if(req.body.operation === "delete") {
        result = await db.removeProductFromUser(req.body.sessionId, Number(req.body.productId), Number(req.body.quantity));
    } else {
        result = await db.addProductToUser(req.body.sessionId, Number(req.body.productId), Number(req.body.quantity), req.body.size);
    }
    if (result === -1) {
        res.send({
            success: false
        })
    } else {
        res.send({
            success: true
        })
    }
})

app.get('/getCart', async (req, res) => {
    let cart = db.findUserBySessionId(req.query.sessionId).cart;
    let result = [];
    for(let i = 0; i < cart.length; i++) {
        let product = await db.getPosition(cart[i].productId);
        product.quantity = cart[i].quantity;
        product.size = cart[i].size;
        result.push(product);
    }
    res.send(result);
})


app.post('/login', async (req, res) => {
    let curUserData = await db.findUser(req.body.email);
    if (!curUserData) {
        res.send({
            success: false,
            errorId: 1,
            error: 'user not found'
        });
        return;
    }

    if (decryptUserPass(curUserData.password) !== req.body.password) {
        res.send({
            success: false,
            errorId: 2,
            error: 'wrong password'
        });
    } else {
        let newSessId = getRandSessionId();
        curUserData.lastSessionId = newSessId;
        await db.changeSessionIdToUser(curUserData.email, newSessId);
        res.send({
            success: true,
            sessionId: newSessId,
            name: curUserData.name
        });
    }
})

app.get('/list', (req, res) => {
    res.render('goodsList');
})

app.get('/cart', (req, res) => {
    res.render('cart');
})

app.get('/favorite', (req, res) => {
    res.render('favoriteList');
})