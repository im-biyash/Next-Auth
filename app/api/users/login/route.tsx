import { connect } from "@/dbConfig/db";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 400 });
        }

        console.log("user exists");

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ message: "Check your credentials" }, { status: 400 });
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

    

        const token =  jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

        const response = NextResponse.json({ message: "User logged in successfully", success: true }, { status: 200 });
        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response;
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
