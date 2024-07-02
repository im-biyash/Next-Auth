import { connect } from "@/dbConfig/db";
import bcrypt from "bcryptjs";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, email, password } = body;
    console.log(body);

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    // Send verification email
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser
    });

  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" });
    console.log(error);
  }
}
