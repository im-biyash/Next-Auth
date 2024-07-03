import { connect } from "@/dbConfig/db";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
    try{
       const response =    NextResponse.json({
                   messsage:"User logged out successfully",
                   success:true                         
          })
          response.cookies.set("token","",{
                httpOnly:true,
           expires: new Date(0)
          }, )
          return response
    }
    catch(error:any){
        console.log(error);
        return NextResponse.json({error:error.message},
            {status:500});  
        }
    }