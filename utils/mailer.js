import nodemailer from "nodemailer"
import bcrypt from 'bcrypt';
import User from "@models/user";
import { contactUsEmail, passwordReset, verficationCode, verficationEmail } from "@components/utils/EmailTemplate";
import Doctor from "@models/doctor";

export const sendEmail = async ({ email, type, userId, contactUsInfo }) => {

    function generateRandomCode() {
        const min = 100000;
        const max = 999999;
        return Math.floor(Math.random() * (max - min) + min);
    }  
    let transport = nodemailer.createTransport({
        host: 'mail.privateemail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: "admin@sehatitaji.com",
            pass: process.env.NAMECHEAP_MAILBOX_SECRET
            //
        }
    });
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10)
        const expireDate = Date.now() + 8000000 // 2 hours
        const expireDateLong = Date.now() + 864000000 // 10 days
        let hashedLink=null
        let mailOptions=null
        switch (type) {
            case "VERIFY":
                await Doctor.findByIdAndUpdate(userId, { verifyToken: hashedToken, verifyTokenExpiry: expireDateLong })
                hashedLink = `${process.env.URL}/api/verifyToken?token=${hashedToken}&id=${userId}`
                mailOptions = {
                    from: '"Sehatitaji.com" <admin@sehatitaji.com>',
                    to: email,
                    subject: "تأكيد التسجيل"  ,
                    html: verficationEmail(hashedLink)
                }
                break;
            case "RESET":
                await User.findByIdAndUpdate(userId,{forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: expireDate})
                hashedLink = `${process.env.URL}/verifyToken/${hashedToken}`
                mailOptions = {
                    from: '"Sehatitaji.com" <admin@sehatitaji.com>',
                    to: email,
                    subject: "تحديث كلمة سر",
                    html: passwordReset(hashedLink)
                }
                break;
            case "PIN_CODE":
                const randomCode = generateRandomCode();
               const response = await User.findByIdAndUpdate(userId, { verifyPinCode: randomCode, verifyPinCodeExpiry: expireDate })
               mailOptions = {
                    from: '"Sehatitaji.com" <admin@sehatitaji.com>',
                    to: email,
                    subject: "تأكيد الموعد الطبي",
                    html: verficationCode(randomCode)
                }
                break;
            case "SUPPORT":
                mailOptions = {
                    from: '"Sehatitaji.com" <support@sehatitaji.com>',
                    to:"admin@sehatitaji.com",
                    subject:"اتصل بنا",
                    html: contactUsEmail(contactUsInfo)
                }
            break;
        }
        const sentMail = await transport.sendMail(mailOptions)
        return sentMail
    } catch (error) {
        console.log("🚀 ~ error:", error)
        throw new Error(error)
    }
}