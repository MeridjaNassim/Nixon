
import {lowDb , Database, DBSaveData } from '../../data/db'

export interface PASSWORD {
    plain : string ,
    name : string,
    user_id : string,
}

class DatabaseService {
    _db : Database ;
    constructor(db : Database) {
        this._db = db
    }
    public async saveNewUser(user_data : any )  {
      
    }
    public async saveNewPassword(password_data : PASSWORD) : Promise<boolean>  {
        return await this._db.save({
            collection : 'passwords',
            data : password_data
        })
    }
}

export default new DatabaseService(lowDb)