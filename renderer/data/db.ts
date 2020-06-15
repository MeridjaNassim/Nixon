import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import {AESerializerBase64 , Serializer, serializer_json} from './serialization'
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
    _serializer? : Serializer
    save(data : DBSaveData) :boolean,
    getAll() : any
}
class LowDB implements Database {
    private _db : low.LowdbSync<any>
    private _dbPath  : string
    private _store : any[]
    _serializer : Serializer
    constructor (dbPath : string, serializer?: Serializer ) {
        this._dbPath = dbPath;
        this._serializer = serializer
        this._init()
        this._store = []
    }
    private _init() {
        let adapter =  new FileSync(this._dbPath, {
            serialize :(data)=> this._serializer.serialize(data),
            deserialize : (data)=> this._serializer.deserialize(data)
        })
        this._db =  low(adapter);
        this._db.defaults({ passwords: [], users: [], sites: [] })
                .write()

    }
    public  save(data : DBSaveData) : boolean {
        if(this._db) {
            this._db.get(data.collection).push(data.data).write()
        }else {
            console.log('undefined db')
        }
        
       return true        
      
    }
    public  getAll() {
        console.log("Retreived data from db " , this._db.get('passwords').value())
    }
}

const serializer_with_aes_encryption = AESerializerBase64.setSecreteKey('XttZ2gWeMCAzM6YyhYRU')

export const lowDb = new LowDB('db.json',serializer_with_aes_encryption)