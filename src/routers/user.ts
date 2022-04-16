import * as express from 'express'
import {Router} from 'express'
import { getUsers, signUp, getMe } from '../controllers/userController'
import {checkJwt} from "../middlewares/checkJWT";
const router:Router = express.Router()

router.get('/', getUsers)
router.post('/new-user', signUp)
router.get('/me', [checkJwt], getMe)



export default router