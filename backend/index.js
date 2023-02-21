import cookieParser from "cookie-parser";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import UserRoute from "./Route/UserRoute.js"
dotenv.config();
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(UserRoute)
//  app.get('/',(req,res)=>{
//     res.send('hello')
//  })
 const abc="mongodb+srv://niloyBlog:BhrJX3OLHKmSS21K@cluster0.2vcoa.mongodb.net/NodeReact"
    
 
 const port=process.env.PORT || 5005
 mongoose.connect(abc,{useNewUrlParser:true,useUnifiedTopology:true})
 .then(result=>{
     app.listen(port,()=>{
         console.log(`server sunning at http://localhost:${port}`);
         console.log(`Database connected`);
     }) 
 }).catch(err=>{
     console.log(`connection failed`);
 })