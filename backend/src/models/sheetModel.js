import mongoose from "mongoose";

const sheetSchema=new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  sheetId:{
    type:String,
    required:true
  },
  columns:[{
    header:{
      type:String,
      required:true
    },
    type:{
      type: String,
      required:true
    }
  }],
  createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
},{timestamps:true});

export default mongoose.model('Sheet',sheetSchema);