"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_2 = require("express");
var http_1 = __importDefault(require("http"));
var cors_1 = __importDefault(require("cors"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var helmet_1 = __importDefault(require("helmet"));
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
var compression_1 = __importDefault(require("compression"));
//  import path from 'path';
var express_session_1 = __importDefault(require("express-session"));
var csurf_1 = __importDefault(require("csurf"));
//  import { NODE_ENV } from './config';
//  import { redisStore } from './redis';
var createApp = function () {
    //   CREATE EXPRESS APP SERVER
    var app = express_1.default();
    // CREATE HTTP SERVER
    var server = http_1.default.createServer(app);
    //  USE BODY PARSER
    app.use(express_2.json({ strict: true, type: 'application/json' }));
    // ENCODE URL
    app.use(express_2.urlencoded({ extended: true }));
    //  COOKIE PARSER
    app.use(cookie_parser_1.default());
    // COMPRESS FILES
    app.use(compression_1.default());
    //  CROSS BROWER
    app.use(cors_1.default());
    //  SECURE HEADERS
    app.use(helmet_1.default());
    // FOR REVERSED PROXY USERS
    app.enable('trust proxy');
    //  INITIALIZE EXPRESS-SESSION TO TRACK THE LOGGED-IN USER ACROSS SESSIONS.
    app.use(express_session_1.default({
        name: 'user_sid',
        secret: 'somerandonstuffs',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 600000,
            httpOnly: true,
            signed: true,
        },
    }));
    // INITIALIZE CSURF PROTECTION
    var csrfProtection = csurf_1.default({ cookie: true });
    //  LIMIT THE AMOUNT OF THE REQUEST OF API
    var apiLimiter = express_rate_limit_1.default({
        windowMs: 15 * 60 * 1000,
        max: 100,
    });
    //  API ENDPOINT
    app.use('/api/', apiLimiter);
    // API ADMIN ENDPOINT
    app.use('/api/admin', csrfProtection);
    //  SEND CSURF TOKEN
    app.get('/api/admin/', function (req, res) {
        res.json({ csrfToken: req.csrfToken() });
    });
    app.get('/', function (req, res) {
        res.json({ data: 'success' });
    });
    //  SERVE STATIC FILES
    /*
    if (NODE_ENV && NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '../../client/build')));
    }
    */
    return { server: server };
};
exports.default = createApp;
