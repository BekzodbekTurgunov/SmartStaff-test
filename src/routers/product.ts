import * as express from 'express'
import {Router} from 'express'
import { getProducts, postProduct, updateProduct, deleteProduct } from '../controllers/product'
const router:Router = express.Router()

router.get('/', getProducts)
router.post('/', postProduct)
router.put('/', updateProduct)
router.delete('/', deleteProduct)



export default router