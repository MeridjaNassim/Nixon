import {promises as fs} from 'fs'
import DatabaseService, {PASSWORD} from '../services/database.service'
import password from '../../pages/api/password';

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
 * Saves data to the database
 * @param saveData the data to be saved on the database
 * 
 */
export async function saveToDb(saveData : {password : string , name : string} ) : Promise<SaveResult> {
    
    let data : PASSWORD = {
        plain : saveData.password,
        name : saveData.name,
        user_id : "1"
    }
    let success = await DatabaseService.saveNewPassword(data)
    return {
        success,
        payload : data
    }

}
export  async  function saveToJsonFile(saveData: any , pathToJsonFile : string ) : Promise<SaveResult> {
    console.log(pathToJsonFile)
    /// converting data 
    let dataToSave  = {
        data : saveData
    }
   try {
    
    let file = await fs.open(pathToJsonFile,"w+");
    let content = await file.readFile('utf-8');
    if(!content){
        content='[]'
    }
    let jsonData = JSON.parse(content);
    let {data} = dataToSave;
    jsonData = [...jsonData , data]
    jsonData = JSON.stringify(jsonData)
    await fs.writeFile(pathToJsonFile,jsonData)
    await file.close()
    return <SaveResult>{
        success : true,
        payload : jsonData
    }
   } catch (error) {
       console.log(error)
       return <SaveResult>{
        success : false,
        payload : error
    }
   }

}
export default saveController