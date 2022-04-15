import * as express from 'express'
import {Router} from 'express'
import { getUsers, postUser } from '../controllers/userController'
const router:Router = express.Router()

router.get('/', getUsers)
router.post('/', postUser)



export default router