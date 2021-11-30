import { startServer } from "./start.mjs";
import { Database } from "./db.mjs";

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

app.post('/setPosition', (req, res) => {
    db.push('positions', req.body);
    res.send({success: true});
})

app.get('/admin', (req, res) => {
    res.render('admin');
})

app.get('/productPage', (req, res) => {
    res.render('productPage');
})

app.get('/list', (req, res) => {
    res.render('goodsList');
})