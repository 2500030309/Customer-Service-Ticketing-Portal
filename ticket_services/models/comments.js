import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    ticketNumber:{
        type:Number,
        required:true
    },
    comment:{
        type:String,
        required:true,
        trim:true
    },
    commentBy:{
        type:String,
        required:true,
        trim:true
    },
    status:{
        type:String,
        enum:["PENDING", "IN_PROGRESS", "COMPLETED"],
        default:"PENDING"
    }

},
{
    timestamps:true
});

commentSchema.index({ ticketNumber: 1, createdAt: 1 });

export default mongoose.model(
    "Comments",
    commentSchema
);
