import Comments from "../models/comments.js";

export async function createComment(data){

    try{
        const comment = await Comments.create({
            ticketNumber: data.ticketNumber,
            comment: data.comment,
            commentBy: data.commentBy,
            status: data.status || "PENDING"
        });

        return {
            code:201,
            message:"Comment Added",
            data:comment
        };
    }catch(e){
        return {
            code:500,
            message:e.message
        };
    }
}

export async function getComments(ticketNumber){

    try{
        const comments =
            await Comments.find({
                ticketNumber:Number(ticketNumber)
            }).sort({ createdAt: 1 });

        return {
            code:200,
            data:comments
        };
    }catch(e){
        return {
            code:500,
            message:e.message
        };
    }
}
