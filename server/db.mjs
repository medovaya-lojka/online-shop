import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));

class Database {
    db = null;
    async init() {
        const file = join(__dirname, 'db.json');
        const adapter = new JSONFile(file);

        this.db = new Low(adapter);
        await this.db.read();
        if(!this.db.data) {
            this.db.data = {posts: []};
        }
    }

    async push(target, content) {
        if(this.db.data[target]) {
            this.db.data[target].push(content);
        } else {
            this.db.data[target] = [content];
        }
        await this.db.write();
    }

    async getPosition(id) {
        let curItem;
        this.db.data.positions.forEach((item) => {
            if (item.id === Number(id)) {
                curItem = item;
            }
        })
        return curItem;
    }

    async getData(target) {
        return this.db.data[target];
    }
}



export { Database };