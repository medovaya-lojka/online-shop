import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

function startServer(port) {
        const app = express();
        app.use(cors());
        app.set('view engine', 'ejs');
        app.set('views', path.join(__dirname, '../ps/views'));
        app.use(express.static(path.join(__dirname, '../ps')));
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        app.listen(port, () => console.log("server started"));
        return app;
}

export { startServer };