import mongoose from "mongoose";
const {Schema}=mongoose;
const userShema = new Schema({
  name:{
    type:String,
    require:true,
  },
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"  
  },
  avatarUrl:{
    type: String,
    required:true,
},
  token: {
    type: String,
    default: null,
  },
},{versionKey:false,timestamps:true})
// const Users= mongoose.model("Users", userShema);
const Users = mongoose.models.Users || mongoose.model("Users", userShema);
console.log(Users,"___Users")
export default Users;
 