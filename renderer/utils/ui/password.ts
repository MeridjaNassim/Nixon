import { PasswordSecurityLevel , PasswordResult} from "../../logic/generatePasswords.util"
import { PASSWORD_ENDPOINT } from "../endpoint"

export const  sendPassword = async (password : PasswordResult) : Promise<Response> => {
    return await fetch(PASSWORD_ENDPOINT, {
        method : "POST",
        headers :{
           'Accept': 'application/json',
           'Content-Type': 'application/json'
        },
        body : JSON.stringify(password)
    })
}

export const getColorBasedOnSecurityLevel = (securityLevel: PasswordSecurityLevel): string => {
    
    switch (securityLevel) {
        case "Very Low":
            return "red"
        
        case "Low":
            return "lightred"
         
        case "Average":
            return "lightorange"
           
        case "Medium":
            return "orange"
        
        case "High":
            return "lightgreen"
        
        case "Very High":
            return "green"
          
        default:
            return "red"
           
    }
}
