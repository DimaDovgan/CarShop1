import mongoose from "mongoose";
const {Schema}=mongoose;
const sellCarShema = new Schema({
  brend:{
    type:String,
    require:true,
  },
  model: {
    type: String,
    required: true,
  },
  generation: {
    type: String,
  },
  motorCapacity: {
    type: Number,
   required:true,
  },
  power:{
    type: String,
    required:true,
   },
   carLicenseplane:{
    type: String,
    required:true,
   },
    owner:{
    type:Schema.Types.ObjectId,
    ref:"Users",
    },
},{versionKey:false,timestamps:true})
const sellCar = mongoose.models.sellCar || mongoose.model("sellCar", sellCarShema);
console.log(sellCar,"___sellCar")
export default sellCar;