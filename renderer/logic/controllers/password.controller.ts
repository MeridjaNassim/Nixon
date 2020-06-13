import {promises as fs} from 'fs'
import DatabaseService, {PASSWORD} from '../services/database.service'
// TODO : Comment the code 
/**
 * The result of the saving
 * @field succes : boolean
 * @field payload : any
 */
export interface SaveResult {
    /** When true the operation went correctly , and no otherwise */
    success : boolean,
    /** Additional data */
    payload : any
}
/**
 * The data to be saved 
 * @field password : string
 * @field name : string
 */
interface PasswordSaveData {
    password : string,
    name : string
}
/**
 * Saves data to the database
 * @param saveData the data to be saved on the database
 * 
 */
export async function savePasswordToDb(passwordData : PasswordSaveData ) : Promise<SaveResult> {
    
    let data : PASSWORD = {
        plain : passwordData.password,
        name : passwordData.name,
        user_id : "1"
    }

    /// saving as a new password
    let success = await DatabaseService.saveNewPassword(data)
    return {
        success,
        payload : data
    }

}