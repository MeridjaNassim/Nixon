import { NextApiRequest, NextApiResponse } from "next";
const getAllPassword = (req :NextApiRequest ,res : NextApiResponse)=>{
  
}
const addPassword = async (req : NextApiRequest , res : NextApiResponse) =>  {

export default  async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      return getAllPassword(req,res);
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
