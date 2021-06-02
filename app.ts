import express from 'express';
import cors from 'cors';
import connectionToDB from './connection-to-db';
import router from './Routes/users-route';
import dotenv from 'dotenv';
import Services from 'http';
import Socket from './config/chatSocket';
dotenv.config();

const startServer = () => {
  const app = express();
  const chatServices = new Services.Server(app);
  const chatSocket = Socket(chatServices);
  chatServices.listen(5000);
  console.log('Chat Server is running in port 5000');

  app.use(express.json());

  app.set('port', process.env.PORT || 4000);

  let http = require('http').Server(app);
  let io = require('socket.io')(http, http, {
    cors: {
      origin: 'http://localhost:4200',
      methods: ['GET', 'POST'],
    },
  });
  app.use(cors());
  connectionToDB()
    .then(() => {
      console.log('Connected to database');
      http.listen(process.env.PORT, function () {
        console.log(`Server Running at http://localhost:${process.env.PORT}`);
      });
    })
    .catch((err: any) => {
      console.log(err.message);
    });

  io.on('connection', function (socket: any) {
    console.log('a user connected');
    // whenever we receive a 'message' we log it out
    socket.on('message', function (message: any) {
      console.log(message);
    });
  });

  app.use('/api', router);
  app.use("/uploads", express.static(__dirname + "/uploads"));
};

startServer();
