import prisma from '../lib/prisma'
import * as sgMail from "@sendgrid/mail";
import * as md5 from 'md5';
export const getUserByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    return user
}

export const generatePassword = (length: number) => {
    let result = "";
    let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const createUser = async (body) => {
    const {firstName, lastName, email} = body
    const password = body.password ? body.password : generatePassword(6)
    const verificationCode = generatePassword(4)
    const [user, userCredential] = await prisma.$transaction([
        prisma.user.create({
            data: {
                firstName,
                email
            }
        }),
        prisma.userCredential.create({
            data: {
                email,
                password:md5(password),
                verificationCode
            }
        })
    ])
    sendVerification(email, verificationCode, userCredential.id, password)
        .then(() => {
            console.log('Email sent')
        })
        .catch(err => {
            console.log("Error sending email", err.message)
        })
    return user
}

export const userVerification = async (userId, verificationCode) => {
    const userCredential = await getUserById(userId)
    if (!userCredential) {
        return{
            status:404,
            message: "User not found"
        }
    }
    if(userCredential.isVerified){
        return{
            status:400,
            message: "User already verified"
        }
    }
    if (userCredential.verificationCode !== verificationCode) {
        await prisma.userCredential.update({
            where: {
                id:userId
            },
            data: {
                invalidAttempts: userCredential.invalidAttempts + 1
            }
        })
        return{
            status:400,
            message: "Verification code is not correct"
        }
    }
    await prisma.userCredential.update({
        where: {
            id:userId,
        },
        data: {
            isVerified: true
        }
    })
    return {
        status:200,
        message: "User verified"
    }
}
export const getUserById = async (id) => {
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    })
    return user
}

export const userLogin = async (email, password) => {
    const userCredential = await getUserByEmail(email)
    if (!userCredential) {
        return{
            status:404,
            message: "User not found"
        }
    }
    if(!userCredential.isVerified){
        return{
            status:400,
            message: "User not verified"
        }
    }
    if (userCredential.password !== md5(password)) {
        return {
            status:400,
            message: "Password is not correct"
        }
    }
    const user = await getUserByEmail(email)
    return {
        status:200,
        message: "User verified",
        user
    }
}

async function sendVerification(email:string, code:string, userId:string, password:string) {
    const url = process.env.PROJECT_URL
        ? process.env.PROJECT_URL
        : "http://localhost:3000";
    let verificationLink = `${url}/auth/verification?userId=${userId}&verificationCode=${code}`;
    let mailOptions = {
        from: process.env.SENDGRID_EMAIL,
        to: email,
        subject: "SmartStaff Email Verification Request",
        html: `<p>Thank you for registering with SmartStaff.<br><br> Please click the attached link below to <a href="${verificationLink}">verify your email</a></p><br><br>
        Should you have any questions, please feel free to reply to this email. Our administrative team is standing by to assist you.<br><br>
        your temporary password is: ${password}<br><br>
        SmartStaff,<br>`,
    };
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    await sgMail.send(mailOptions);
}