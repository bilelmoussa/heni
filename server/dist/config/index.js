"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
dotenv_1.config();
//  SERVER
var PORT = Number(process.env.PORT) || 8080;
exports.PORT = PORT;
var NODE_ENV = process.env.NODE_ENV ? String(process.env.NODE_ENV) : 'development';
exports.NODE_ENV = NODE_ENV;
//  REDIS PORT
var REDIS_PORT = Number(process.env.REDIS_PORT) || 6379;
exports.REDIS_PORT = REDIS_PORT;
var REDIS_SECRET = process.env.REDIS_SECRET ? String(process.env.REDIS_SECRET) : 'RedisSecret';
exports.REDIS_SECRET = REDIS_SECRET;
