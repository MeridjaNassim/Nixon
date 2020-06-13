import { ReactElement, useState, useEffect, ChangeEvent } from 'react'
import { Button ,  Modal, notification, InputNumber, Checkbox, Input , Divider} from 'antd';

import { CopyOutlined ,DownloadOutlined} from '@ant-design/icons';
import { NotificationPlacement } from 'antd/lib/notification';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import {PASSWORD_ENDPOINT } from "../../utils/endpoint"
import { PasswordGenerationConfig, PasswordResult, PasswordSecurityLevel  } from '../../logic/generatePasswords.util'
import passwordService from '../../logic/services/password_generator.service'
interface Props {

}
export default function passwordGenerator({ }: Props): ReactElement {
    const [password, setPassword] = useState<PasswordResult>({
        password: '',
        securityLevel: "Very Low"
    })
    const [passwordParams, setPasswordParams] = useState<PasswordGenerationConfig>({
        length: 12,
        memorable: false,
    });
    const [modalVisible , setModalVisible] = useState<boolean>(false);
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
        let pass = passwordService.generatePassword(passwordParams)
        setPassword(pass)
    }
    const onChangePasswordManually = (e : ChangeEvent<HTMLInputElement>) =>{
        setPassword({ password : e.target.value , securityLevel : passwordService.getSecurityLevel(e.target.value) })
    }
   const showModal = () => {
        setModalVisible(true)
      };
    
      const handleOk = e => {
        console.log(e);
        console.log("Saving " , password)
        savePassword(e)
            .then( _ => setModalVisible(false))
        
      };
    
      const handleCancel = e => {
        console.log(e);
        setModalVisible(false)
      };

     useEffect(() => {
         
         return () => {
          
         }
     }, []) 

     const savePassword = (e : MouseEvent)=> {
        e.preventDefault();
        return fetch(PASSWORD_ENDPOINT, {
            method : "POST",
            headers :{
               'Accept': 'application/json',
               'Content-Type': 'application/json'
            },
            body : JSON.stringify(password)
        })
           .then(res => res.json())
           .then(json => console.log(json))
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
                {password.password !== '' ? <Button onClick={(e) => {
                    showModal()
                }}> <DownloadOutlined title="Save password" style={{ margin: 0 }} /></Button>
                    : null}
            </div>
            <Modal
          title="Save generated password"
          visible={modalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
            <label>
                Password
            <Input placeholder="Password Name" value={password.name} onChange={e=>{
              setPassword({...password , name : e.target.value})
          }}/>
            </label>
         
      
        </Modal>
            <div style={{
                marginTop: '20px'
            }}>
                <InputNumber min={1} max={50} defaultValue={3} onChange={onInputNumberChange} title="password length" />
                <Checkbox  checked={passwordParams.memorable} style={{
                    marginLeft: '20px'
                }} onChange={onCheckBoxChange}>memorable?</Checkbox>
            </div>
            <Input style={{

                fontSize: '30px',
                border: '2px solid var(--antd-wave-shadow-color)',
                padding: "10px",
                marginTop: '10px',
                background : 'transparent',
                maxWidth :"60%",
                textAlign : "center",
                color: 'var(--antd-wave-shadow-color)'
            }} value={password.password} onChange={onChangePasswordManually}></Input>

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
