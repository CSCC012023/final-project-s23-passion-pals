import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
// import userAuthentication from "./models/postAuth.js"

const app = express();



app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use('/posts', postRoutes);
const CONNECTION_URL = 'mongodb+srv://Mustafa:mustafa0503@cluster0.seqdo7a.mongodb.net/'
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL,{ useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> app.listen(PORT,()=> console.log(`Server running on port: ${PORT}`)))
    .catch((error)=> console.log(error.message));


const newSchemaForLogin=new mongoose.Schema({
    email: String,
    password: String
})

const userAuthentication = mongoose.model("userAuthentication",newSchemaForLogin)
app.post("/", async (req,res)=>{
    //with help of axios in login page we are getting the exact email and address
    const{email,password}=req.body
    //console.log(email, password)
    try{
        //console.log(userAuthentication)
        const check = await userAuthentication.findOne({email:email})
       // console
        if(check){
            
            //if it already exist
            res.json("exist")
        }
        else{
            
            res.json("notexist")
        }
    }catch(e){
        
        res.json("notexist")
    }
})





app.post("/signup", async(req,res)=>{
    //console.log("************gg")
    const{email,password}=req.body
    const data={
        email:email,
        password:password
    }
    try{
        const check=await userAuthentication.findOne({email:email})
        if(check){
            //if it already exist
            res.json("exist")
        }
        else{
            res.json("notexist")
            
            await userAuthentication.insertMany([data])
        }
    }catch(e){
        res.json("notexist")
    }
})
app.listen(8000,()=>{
    console.log("port connected")
})