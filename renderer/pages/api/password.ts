import { NextApiRequest, NextApiResponse } from "next";
import {savePasswordToDb} from '../../logic/controllers/password.controller'

const addPassword = async (req : NextApiRequest , res : NextApiResponse) =>  {
  const {password, name } :{password : string  , name : string} = req.body
  if(password) {
    let {success,payload} = await savePasswordToDb({
      password , 
      name
    })

    if(success) {
      res.status(200).json(payload)
    }else {
      res.status(500).send(payload)
    }
  }else {
    res.status(400).send({msg : 'Password not sent !'})
  }
  

}

export default  async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      return null;
    case "POST":
      return addPassword(req,res);
    case "PUT":
      break;

    case "PATCH":
      break;

    case "DELETE":
      break;
    default:
      return;
  }
};
