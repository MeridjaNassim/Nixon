import { NextApiRequest, NextApiResponse } from "next";
import {saveToDb} from '../../logic/controllers/save.controller'

const addPassword = async (req : NextApiRequest , res : NextApiResponse) =>  {
  const {password, name } :{password : string  , name : string} = req.body
  console.log(password)
  console.log(name)
  if(password) {
    let {success,payload} = await saveToDb({
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
