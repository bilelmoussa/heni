"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redis_1 = __importDefault(require("redis"));
var express_session_1 = __importDefault(require("express-session"));
var config_1 = require("../config");
var logger_1 = require("../shared/logger");
var connect_redis_1 = __importDefault(require("connect-redis"));
var RedisStore = connect_redis_1.default(express_session_1.default);
var redisClient = redis_1.default.createClient();
redisClient
    .on('connect', function () {
    logger_1.logger.info("Redis is Connected on Port " + config_1.REDIS_PORT);
})
    .on('ready', function () {
    logger_1.logger.info("Redis is Ready on Port " + config_1.REDIS_PORT);
})
    .on('error', function (e) {
    logger_1.logger.error('Redis Error: ', e);
})
    .on('close', function () {
    logger_1.logger.info('Redis is closed');
})
    .on('reconnecting', function () {
    logger_1.logger.info('Redis is reconnecting ...');
})
    .on('end', function () {
    logger_1.logger.info('Redis connection is disconnected');
});
var redisStore = new RedisStore({
    host: 'localhost',
    port: config_1.REDIS_PORT,
    client: redisClient,
    ttl: 604800,
});
exports.redisStore = redisStore;
var getAllActiveSessions = function () {
    return new Promise(function (resolve, reject) {
        redisStore.all(function (err, sessions) {
            if (err)
                reject(err);
            else
                resolve(sessions);
        });
    });
};
exports.getAllActiveSessions = getAllActiveSessions;
