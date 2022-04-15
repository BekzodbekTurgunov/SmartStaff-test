import {Request, Response} from 'express'
import {getUserByEmail, getUserById, userVerification} from '../helper/apiHelper'

export const login = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body
        const user = await getUserByEmail(email)
        if (!user) {
            return res.status(400).json({
                message: 'Invalid email or password'
            })
        }
        const isMatch = password === user.password
        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid email or password'
            })
        }
        const token = user.generateToken()
        res.json({
            token
        })
    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
}

export const verification = async (req: Request, res: Response) => {
    const {userId, verificationCode } = req.body
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