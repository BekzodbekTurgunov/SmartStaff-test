// import { checkEmail } from '@/helper/checker'
import {checkEmail} from '../helper/checker'
import {createUser} from '../helper/apiHelper'
import {Request, Response} from 'express'
import prisma from '../lib/prisma'
export const getUsers = async (req: Request, res: Response) => {
    try{
        const users =  await prisma.user.findMany()
        res.json(users)
    }catch (e) {
        res.status(500).json({message: e.message})
    }
}

export const signUp = async (req: Request, res: Response) => {
   try{
       const email = req.body.email
       if(!checkEmail(email)){
           return res.status(400).json({
               message: 'Invalid email'
           })
       }
        const checkUser = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if(checkUser){
            return res.status(409).json({
                message: 'User already exists'
            })
        }
       const user = await createUser(req.body)
       return res.status(201).json({
           message:"User created successfully",
           user
       })
   }catch (e) {
       console.log("Error on create user", e.message)
       return res.status(500).json({
           message: 'Internal server error'
       })
   }
}

