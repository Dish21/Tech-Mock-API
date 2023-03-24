import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import connect from "./database/conn.js";
import authRouter from "./router/authRoute.js";

const app = express();

/** middlewares */
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by"); // less hackers know about our stack

/** HTTP GET Request */
app.get("/", (req, res) => {
  res.status(201).json("Home GET Request");
});

/** api routes */
app.use("/auth", authRouter);
// app.use("/api");

/** start server only when we have valid connection */
const port = process.env.PORT || 9000;
connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`Server connected to http://localhost:${port}`);
      });
    } catch (error) {
      console.log("Cannot connect to the server");
    }
  })
  .catch((error) => {
    console.log("Invalid database connection...!");
  });
