import * as express from 'express'
import {Application} from 'express'
import {Request, Response} from 'express'
import * as dotenv from 'dotenv'
import cors = require('cors');
import routes from "./routers";
dotenv.config()
const app:Application = express()

app.use(express.json())
app.use(cors())
app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to our test app")
})
app.use("/", routes);


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
