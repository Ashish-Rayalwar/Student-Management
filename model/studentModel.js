const  mongoose  = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId
const studentSchema = new mongoose.Schema({
    userId: {type:ObjectId, required:true, ref : "User",trim:true},
    name:{
        type:String,
    },

    lname:{
        type:String
    },
    subject:[

        {
            name:{type:String},
            marks:{type:Number}
        }
    ],
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true})



module.exports = mongoose.model("Student",studentSchema)