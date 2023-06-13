import mongoose from 'mongoose';
const newSchemaForLogin=new mongoose.Schema({
    email: String,
    password: String
})

const userAuthentication = mongoose.model("Users",newSchemaForLogin)
export default userAuthentication;