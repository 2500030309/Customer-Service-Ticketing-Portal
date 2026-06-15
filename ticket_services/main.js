import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import {connectDB}
from "./config/db.js";

import commentRouter
from "./controllers/commentControllers.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8002;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        status: 200,
        message: "Ticket comments service running"
    });
});

app.get("/health", (req, res) => {
    res.json({
        status: 200,
        service: "ticket-comments-service",
        mongo: "connected"
    });
});

app.use("/comments", commentRouter);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        code: 500,
        message: "Internal server error"
    });
});

async function startServer() {
    try {
        await connectDB();

        app.listen(PORT, ()=>{

            console.log(
                `Node Server Running on port ${PORT}`
            );
        });
    } catch (err) {
        console.error("Server startup failed:", err.message);
        process.exit(1);
    }
}

startServer();
