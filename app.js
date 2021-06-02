"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var connection_to_db_1 = __importDefault(require("./connection-to-db"));
var users_route_1 = __importDefault(require("./Routes/users-route"));
var dotenv_1 = __importDefault(require("dotenv"));
var http_1 = __importDefault(require("http"));
var chatSocket_1 = __importDefault(require("./config/chatSocket"));
dotenv_1.default.config();
var startServer = function () {
    var app = express_1.default();
    var chatServices = new http_1.default.Server(app);
    var chatSocket = chatSocket_1.default(chatServices);
    chatServices.listen(5000);
    console.log('Chat Server is running in port 5000');
    app.use(express_1.default.json());
    app.set('port', process.env.PORT || 4000);
    var http = require('http').Server(app);
    var io = require('socket.io')(http, http, {
        cors: {
            origin: 'http://localhost:4200',
            methods: ['GET', 'POST'],
        },
    });
    app.use(cors_1.default());
    connection_to_db_1.default()
        .then(function () {
        console.log('Connected to database');
        http.listen(process.env.PORT, function () {
            console.log("Server Running at http://localhost:" + process.env.PORT);
        });
    })
        .catch(function (err) {
        console.log(err.message);
    });
    io.on('connection', function (socket) {
        console.log('a user connected');
        // whenever we receive a 'message' we log it out
        socket.on('message', function (message) {
            console.log(message);
        });
    });
    app.use('/api', users_route_1.default);
    app.use("/uploads", express_1.default.static(__dirname + "/uploads"));
};
startServer();
