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
    }
    req.body.password = CryptoJS.encrypt(req.body.password, SECRET_KEY).toString();
    req.body.lastSessionId = getRandSessionId();
    await db.push('users', req.body);
    res.send({success: true, id: req.body.lastSessionId});
})

const decryptUserPass = (cipherText) => {
    return enc.stringify(CryptoJS.decrypt(cipherText, SECRET_KEY));
}

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