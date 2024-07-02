import nodemailer from "nodemailer";
import User from "@/models/userModel"
import bycrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {

    const hashedToken = await bycrypt.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifytoken: hashedToken,
        verifytokenExpiry: Date.now() + 10 * 60 * 1000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgetPasswordToken: hashedToken,
        forgetPasswordExpiry: Date.now() + 10 * 60 * 1000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "ac784b77ca721c",
        pass: "********3a68",
      },
    });
    const mailOptions = {
      from: "bsstha@gmail.com.aiii",
      to: email,
      subject: emailType === "verify" ? "Email Verification" : "Password Reset",
      html: `<>Click the link below <a href="${
        process.env.DOMAIN
      }/VerifyEmail?token=${hashedToken}">here</a> to ${
        emailType == "VERIFY" ? "verify your email" : "reset your password"
      }
        OR COPY PASTE THE LINK IN BROWSER <BR>
        ${process.env.DOMAIN}/VerifyEmail?token=${hashedToken}</>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
