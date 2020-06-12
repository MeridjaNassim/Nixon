import { NextApiRequest, NextApiResponse } from "next";
import {saveToJsonFile} from '../../logic/controllers/save.controller'

const addPassword = async (req : NextApiRequest , res : NextApiResponse) =>  {

  

  let {success,payload} = await saveToJsonFile(req.body,'N:\\JSprojects\\nextron-password-manager\\renderer\\data\\stored\\passwords.json')

  if(success) {
    res.status(200).json(payload)
  }else {
    res.status(500).send(payload)
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
