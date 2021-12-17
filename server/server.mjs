import { startServer } from './start.mjs';
import { Database } from './db.mjs';

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

app.get('/list', (req, res) => {
    res.render('goodsList');
})