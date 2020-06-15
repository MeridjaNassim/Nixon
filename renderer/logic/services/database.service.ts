
import {lowDb , Database, DBSaveData } from '../../data/db'

export interface PASSWORD {
    plain : string ,
    name : string,
    user_id : string,
}

class DatabaseService {
    private _db : Database ;
    constructor(db : Database) {
        this._db = db
    }
    public async saveNewUser(user_data : any )  {
      
    }
    public  saveNewPassword(password_data : PASSWORD) : Promise<boolean>  {
        ///TODO : Clean this code after implementing all db opérations .
        let p = Promise.resolve( this._db.save({
            collection : 'passwords',
            data : password_data
        }))
        p.then(inserted => {
            if(inserted) {
                this._db.getAll()
            }
        })
        return p;
    }
}

export default new DatabaseService(lowDb)