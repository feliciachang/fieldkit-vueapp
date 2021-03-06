import Sqlite from "nativescript-sqlite";

class DatabaseWrapper {
    constructor(db) {
        this.db = db;
        this.db.resultType(Sqlite.RESULTSASOBJECT);
    }

    query(sql, params) {
        return this.db.all(sql, params).then(rows => {
            return rows;
        });
    }

    execute(sql, params) {
        return this.db.execSQL(sql, params).then(r => {
            return this;
        });
    }
}

export default class SqliteNativeScript {
    open(name) {
        return new Promise((resolve, reject) => {
            new Sqlite(name, (err, db) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(new DatabaseWrapper(db));
            });
        });
    }
}
