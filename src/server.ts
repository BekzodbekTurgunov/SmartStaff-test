import * as express from 'express'
import {Application} from 'express'
import * as dotenv from 'dotenv'
import cors = require('cors');
import routes from "./routers";
dotenv.config()
const app:Application = express()

app.use(express.json())
app.use(cors())
app.use("/", routes);


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
