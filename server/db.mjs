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

    async push(content) {
        this.db.data.posts.push(content);
        await this.db.write();
    }

    async getData() {
        console.log(this.db.data);
    }
}



export { Database };