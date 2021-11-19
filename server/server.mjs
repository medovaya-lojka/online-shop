import { startServer } from "./start.mjs";
import { Database } from "./db.mjs";

const PORT = 9000;
const app = startServer(PORT);
const db = new Database();
await db.init();
await db.push({test: 0});
await db.getData();
app.get('/', (req, res) => {
    res.render('main');
})

app.get('/test-api', (req, res) => {
    res.send({success: true});
})
