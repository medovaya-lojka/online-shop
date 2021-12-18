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

    findUser(email) {
        let curItem;
        this.db.data.users.forEach((item) => {
            if (item.email === email) {
                curItem = item;
            }
        })
        return curItem;
    }

    findUserBySessionId(sessionId) {
        let curItem;
        this.db.data.users.forEach((item) => {
            if (item.sessionId === sessionId) {
                curItem = item;
            }
        })
        return curItem;
    }

    isAdminSessionValid(sessionId) {
        if (this.isValidSession(sessionId)) {
            return this.findUserBySessionId(sessionId).isAdmin;
        }
        return false;
    }

    isValidSession(sessionId) {
        let result = false;
        this.db.data.users.forEach((item) => {
            if (item.sessionId === sessionId) {
                result = true;
            }
        })
        return result;
    }

    async changeSessionIdToUser(email, sessionId) {
        this.db.data.positions.forEach((item) => {
            if (item.email === email) {
                item.sessionId = sessionId;
            }
        })
        await this.db.write();
        return true;
    }

    async getData(target) {
        return this.db.data[target];
    }
}



export { Database };