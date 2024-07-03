import { NextRequest } from "next/server";

import jwt from "jsonwebtoken";



export const getDatafromtoken = async (req: NextRequest) => {

   try{

    const token = req.cookies.get("token")?.value;
   const decodedToken:any =  jwt.verify(token!, process.env.TOKEN_SECRET!);
   return decodedToken.id;

   }
   catch(err:any) {
    throw new Error(err);
   }
}