import { ReactElement, useState, ChangeEvent } from 'react'
import { Button, notification, InputNumber, Checkbox, Input } from 'antd';
import { generatePassword, PasswordGenerationConfig, PasswordResult, PasswordSecurityLevel , getSecurityLevel } from '../../logic/generatePasswords.util'
import { CopyOutlined } from '@ant-design/icons';
import { NotificationPlacement } from 'antd/lib/notification';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';


interface Props {

}
const { TextArea } = Input;
export default function passwordGenerator({ }: Props): ReactElement {
    const [password, setPassword] = useState<PasswordResult>({
        password: '',
        securityLevel: "Very Low"
    })
    const [passwordParams, setPasswordParams] = useState<PasswordGenerationConfig>({
        length: 12,
        memorable: true,
    });
    const openNotification = (placement: NotificationPlacement) => {
        notification.success({
            message: 'Copied to Clipboard',
            placement
        })
    }
    const onInputNumberChange = (value: number) => {
        setPasswordParams({ ...passwordParams, length: value })
    }
    const onCheckBoxChange = (e: CheckboxChangeEvent) => {
        setPasswordParams({ ...passwordParams, memorable: e.target.checked })
    }
    const generateNewPassword = () => {
        let pass = generatePassword(passwordParams)
        setPassword(pass)
    }
    const onChangePasswordManually = (e : ChangeEvent<HTMLTextAreaElement>) =>{
        setPassword({ password : e.target.value , securityLevel : getSecurityLevel(e.target.value) })
    }
    return (
        <>
            <div>
                <Button className="btn" onClick={generateNewPassword}>Generate password</Button>
                {password.password !== '' ? <Button onClick={(e) => {
                    navigator.clipboard.writeText(password.password)
                    openNotification('bottomRight')
                }}> <CopyOutlined title="Copy to clipboard" style={{ margin: 0 }} /></Button>
                    : null}

            </div>
            <div style={{
                marginTop: '20px'
            }}>
                <InputNumber min={1} max={50} defaultValue={3} onChange={onInputNumberChange} title="password length" />
                <Checkbox style={{
                    marginLeft: '20px'
                }} onChange={onCheckBoxChange}>memorable?</Checkbox>
            </div>
            <TextArea style={{

                fontSize: '30px',
                border: '2px solid var(--antd-wave-shadow-color)',
                padding: "10px",
                marginTop: '10px',
                maxWidth :"60%",
                textAlign : "center",
                color: 'var(--antd-wave-shadow-color)'
            }} value={password.password} onChange={onChangePasswordManually}></TextArea>

            <p>{(password.password === '') ? "hidden" : `Security Level : `} <span style={{
                color: getColorBasedOnSecurityLevel(password.securityLevel)
            }}>{password.securityLevel}</span></p>
            <style jsx>{`
             
                
            `}</style>
        </>
    )
}

const getColorBasedOnSecurityLevel = (securityLevel: PasswordSecurityLevel): string => {
    switch (securityLevel) {
        case "Very Low":
            return "red"
            break;
        case "Low":
            return "lightred"
            break;
        case "Average":
            return "lightorange"
            break;
        case "Medium":
            return "orange"
            break;
        case "High":
            return "lightgreen"
            break;
        case "Very High":
            return "green"
            break;
        default:
            return "transparent"
            break;
    }
}
