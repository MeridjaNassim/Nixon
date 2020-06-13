import {useState} from  'react'
import { PasswordGenerationConfig, PasswordResult, PasswordSecurityLevel  } from '../generatePasswords.util'
export const usePassword = ()=>{
    return useState<PasswordResult>({
        password: '',
        securityLevel: "Very Low"
    })
}
export const useConfig = ()=> {
    return useState<PasswordGenerationConfig>({
        length: 12,
        memorable: false,
    });
}