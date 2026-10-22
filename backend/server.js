import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database/db.js';
import userRoute from './routes/user.route.js';
import blogRoute from './routes/blog.route.js';
import dns from 'dns';
import commentRoute from "./routes/comment.route.js"
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Change DNS
dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config()
const app = express();

//default middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

const PORT = process.env.PORT || 3000

app.use("/api/v1/user", userRoute)
app.use("/api/v1/blog", blogRoute)
app.use("/api/v1/comment", commentRoute)

app.listen(PORT, () => {
    connectDB();
    console.log(`Server listing at port ${PORT}`);
})