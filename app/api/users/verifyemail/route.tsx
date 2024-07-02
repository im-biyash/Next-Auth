import { connect } from "@/dbConfig/db";
import User from "@/models/userModel"
import { log } from "console";
import { NextRequest, NextResponse } from "next/server";


connect();
export async function POST(request:NextRequest) {
    try{
 const reqBody = await request.json();
 const {token} = reqBody;
 log(token);
   const user = User.findOne({VerifyToken:token,VerifyTokenExpiry:{$gt:Date.now()}})
   if(!user){
    return NextResponse.json({error:"Invalid token"},
        {status:400});
   }
    console.log(user);
    user.isVerified = true;
    user.VerifyToken = undefined;
    user.VerifyTokenExpiry = undefined;
    await user.save();
    return NextResponse.json({message:"Email verified successfully"},
        {status:200});
    
    }
    catch(error:any){
        console.log(error);
        return NextResponse.json({error:error.message},
            {status:500});
    }

}