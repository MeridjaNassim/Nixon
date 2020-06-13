import { PasswordResult, PasswordGenerationConfig } from "../../generatePasswords.util";
import {createContext} from 'react'
interface PasswordState {
    password : PasswordResult,
    config : PasswordGenerationConfig
}

const initialState : PasswordState = {
    password : {
        name : '',
        password : '',
        securityLevel : 'Very Low',
    },
    config : {
        length :12,
        memorable :false
    }
}
const PasswordContext = createContext(initialState);

export default PasswordContext.Provider