import * as express from 'express'
import {Router} from 'express'
import { getUsers, signUp } from '../controllers/userController'
const router:Router = express.Router()

router.get('/', getUsers)
router.post('/new-user', signUp)



export default router