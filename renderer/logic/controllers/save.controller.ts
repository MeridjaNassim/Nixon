import { FileHandle } from 'fs/promises';
const fs = require('fs').promises
export interface SaveData  {
    data : any,
}
export interface SaveDestination {
    save(data : SaveData) : void
}
export interface SaveResult {
    success : boolean,
    payload : any
}
const saveController = (saveData : SaveData , destination : SaveDestination) => destination.save(saveData);

export  async  function saveToJsonFile(saveData: any , pathToJsonFile : string ) : Promise<SaveResult> {
    console.log(pathToJsonFile)
    /// converting data 
    let dataToSave : SaveData = {
        data : saveData
    }
   try {
   
    let content = await fs.readFile(pathToJsonFile,'utf-8')
    let jsonData = JSON.parse(content);
    let {data} = dataToSave;
    jsonData = [...jsonData , data]
    jsonData = JSON.stringify(jsonData)
    await fs.writeFile(pathToJsonFile,jsonData)
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