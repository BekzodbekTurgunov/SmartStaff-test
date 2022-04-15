
import {Request, Response} from 'express'
import {getUserByEmail} from '../helper/apiHelper'
 
export const login = async (req: Request, res: Response) => {
    const {email, password} = req.body
    const user = await getUserByEmail(email)
    if(!user){
        return res.status(400).json({
            message: 'Invalid email or password'
        })
    }
    const isMatch = password === user.password
    if(!isMatch){
        return res.status(400).json({
            message: 'Invalid email or password'
        })
    }
    const token = user.generateToken()
    res.json({
        token
    })
}