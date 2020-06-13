import low from 'lowdb'
import FileAsync from 'lowdb/adapters/FileAsync'
/// Data Schema to save
interface Data {}

export interface UserData extends Data {
    id : string ,
    username : string,
    password_hash : string,
    createdAt : Date
}
export interface PasswordData extends Data{
    id : string,
    user_id: string,
    cipher : string,
    hash: string,
    addedAt : Date
}
/// collections available in db
export type  USER_COLLECTION = 'users'
export type PASSWORD_COLLECTION = 'passwords'
export type SITE_COLLECTION = 'sites'
type Collection = USER_COLLECTION | PASSWORD_COLLECTION | SITE_COLLECTION
/// ------------

export interface DBSaveData {
    collection : Collection , 
    data : Data
}
export interface Database {
    save(data : DBSaveData) : Promise<boolean>,
    getAll() : any
}
class LowDB implements Database {
    private _db : low.LowdbAsync<any>
    private _dbPath  : string
    private _store : any[]
    constructor (dbPath : string) {
        this._dbPath = dbPath;
        this._init()
        this._store = []
    }
    private async _init() {
        // let adapter =  new FileAsync(this._dbPath)
        // this._db = await low(adapter);
    }
    public async save(data : DBSaveData) : Promise<boolean> {
        let c = this._store.push(data)
        return Boolean(c)
    }
    public async getAll() {
        return this._store
    }
}
export const lowDb = new LowDB('db.json')