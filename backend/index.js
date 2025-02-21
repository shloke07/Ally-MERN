require("dotenv").config();
const express = require("express");
const cors = require("cors")
const app = express();
const { connection } = require("./db/db.js");
const userRoute = require("./routes/userRoute.js");
const avatarRoute = require("./routes/avatarRoute.js");
const cookieParser = require("cookie-parser")
const createWebSocketServer = require("./ws.js");
const path = require("path");
const morgan = require('morgan');
const chalk = require('chalk');

//Database Connection
connection();

//middlewares
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:4000",
    "http://localhost:8000",
    "http://localhost:4173",
    "http://localhost:5173",
    "https://swifty-chatty-appy.onrender.com",
    "https://ally-chat-express-app.onrender.com",
    "https://ally-mern.onrender.com"
]

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error(`Not Allowed by CORS for origin - ${origin}` ));
        }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 204,
    credentials: true, // Allow credentials like cookies
};
app.use(cors(corsOptions));

// Define a custom token that logs the request method with color
morgan.token('colored-method', (req) => {
    return chalk.green(req.method);
});

// Define a custom token that logs the URL with color
morgan.token('colored-url', (req) => {
    return chalk.blue(req.url);
});

// Define a custom format string using the colored tokens
app.use(
    morgan((tokens, req, res) => {
        return [
            chalk.yellow(`[${tokens.date(req, res)}]`),
            tokens['colored-method'](req, res),
            tokens['colored-url'](req, res),
            chalk.magenta(tokens.status(req, res)),
            tokens['response-time'](req, res) + ' ms'
        ].join(' ');
    })
);

//routes
app.use("/api/user", userRoute);
app.use("/api/avatar", avatarRoute);


const port = process.env.PORT || 8000;
const server = app.listen(port, () => console.log(chalk.cyan(`Application Running on Port ${port}`)));

createWebSocketServer(server);
app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));

// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/dist/index.html'), (err) => {
//         if (err) {
//             console.error('Error sending file:', err);
//         }
//     });
// });
