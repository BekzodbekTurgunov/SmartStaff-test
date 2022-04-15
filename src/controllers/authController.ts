import {Request, Response} from 'express'
import {userLogin, userVerification} from '../helper/apiHelper'

export const login = async (req: Request, res: Response) => {
    const {email, password} = req.body
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Please enter all fields'
        })
    }
    try {
        const result = await userLogin(email, password)
        if(result.status !== 200) {
            return res.status(result.status).json({
                message: 'Invalid email or password'
            })
        }
        const user = result.user
        return res.status(200).json({
            message: 'Login successful',
            user
        })
    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
}

export const verification = async (req: Request, res: Response) => {
    const {userId, verificationCode} = req.body
    if (!userId || !verificationCode) {
        return res.status(400).json({
            message: 'Invalid request'
        })
    }
    try {
        const {status, message} = await userVerification(userId, verificationCode)
        return res.status(status).json({
            message
        })

    } catch (err) {
        res.status(400).json({
            message: 'Invalid token'
        })
    }
}