import { connect } from "@/dbConfig/db";
import { NextRequest, NextResponse } from "next/server";
import { getDatafromtoken } from "@/helpers/getDatafromtoken";

connect();


export async function GET(request: NextRequest) {
   const userId = await getDatafromtoken(request);
  const user=  await userId.findOne({_id: userId}).select("-password"));
  return NextResponse.json({user})

    
}




























































