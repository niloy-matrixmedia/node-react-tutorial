import mongoose from "mongoose"
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    }
})

const UserModel = new mongoose.model('auth',userSchema)
export default UserModel