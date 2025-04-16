import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({limit: "16kb"})) // accept json
app.use(express.urlencoded({extended: true, limit: "16kb"})) 
app.use(express.static("public"))
app.use(cookieParser())


// routes

import userRouter from "./routes/user.routes.js"
import blogRouter from "./routes/blog.routes.js"
import uploadImageRouter from './routes/uploadImage.routes.js'

// // routes declaration
app.use("/api/users" , userRouter)
app.use("/api/blogs" , blogRouter)
app.use("/api/upload-image", uploadImageRouter)


export {app}