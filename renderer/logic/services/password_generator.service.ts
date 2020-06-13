import { generatePassword, PasswordGenerationConfig, PasswordResult, PasswordSecurityLevel , getSecurityLevel } from '../generatePasswords.util'


class PasswordGenerator {

    public generatePassword(config : PasswordGenerationConfig) : PasswordResult {
        return generatePassword(config)
    }

    public getSecurityLevel(password : string) : PasswordSecurityLevel {
        return getSecurityLevel(password)
    }

}

export default new PasswordGenerator()