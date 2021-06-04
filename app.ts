import express from "express";
import cors from "cors";
import connectionToDB from "./connection-to-db";
import router from "./Routes/users-route";
import chatRouter from "./Routes/chats-route";
import dotenv from "dotenv";
dotenv.config();

const startServer = () => {
  const app = express();

  app.use(express.json());

  app.use(cors());

  connectionToDB()
    .then(() => {
      console.log("Connected to database");

      // app.on("error", (err: any) => {
      // 	console.log(`Error Connecting to http://localhost:${process.env.PORT}`);
      // 	console.log(err.message);
      // });

      app.listen(process.env.PORT, () => {
        console.log(`Server Running at http://localhost:${process.env.PORT}`);
      });
    })
    .catch((err: any) => {
      console.log(err.message);
    });

  app.use("/api", router);
  app.use("/api/chats", chatRouter);
  app.use("/uploads", express.static(__dirname + "/uploads"));
};

startServer();
