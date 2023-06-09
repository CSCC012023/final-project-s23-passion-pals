import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    selectedFile: String,
    createdAt:{
        type: Date,
        default: new Date()
    },      
})

const PostMessage = mongoose.model('PostMessage', postSchema);

const newSchemaForLogin=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const userAuthentication = mongoose.model("collection",newSchemaForLogin)

export {PostMessage,userAuthentication};

export default PostMessage;