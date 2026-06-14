import express from "express";

import * as commentService
from "../services/commentService.js";

const router = express.Router();

router.post("/add", async(req,res)=>{

    const response =
        await commentService
        .createComment(req.body);

    res.status(response.code).json(response);
});

router.get("/:ticketNumber",
async(req,res)=>{

    const response =
        await commentService
        .getComments(
            req.params.ticketNumber
        );

    res.status(response.code).json(response);
});

export default router; 
