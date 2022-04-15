import * as express from 'express'
import {Application} from 'express'
import * as dotenv from 'dotenv'
import productRouter from './routers/product'
dotenv.config()
const app:Application = express()

app.use(express.json())
app.use('/api/products', productRouter)


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
