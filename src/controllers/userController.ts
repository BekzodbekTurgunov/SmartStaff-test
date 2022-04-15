// import { checkEmail } from '@/helper/checker'
import {checkEmail} from '../helper/checker'
import {Request, Response} from 'express'
import prisma from '../lib/prisma'
export const getUsers = async (req: Request, res: Response) => {
    const users =  await prisma.user.findMany()
    res.json(users)
}

export const postUser = async (req: Request, res: Response) => {
    const {firstName, email} = req.body
    if(!checkEmail(email)){
        return res.status(400).json({
            message: 'Invalid email'
        })
    }
    const user = await prisma.user.create({
        data: {
            firstName,
            email
        }
    })
    res.json(user)
} 

