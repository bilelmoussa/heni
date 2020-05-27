import redis from 'redis';
import session from 'express-session';
import { REDIS_PORT } from '../config';
import { logger } from '../shared/logger';
import connectRedis from 'connect-redis';

const RedisStore = connectRedis(session);

const redisClient = redis.createClient();

redisClient
    .on('connect', () => {
      logger.info(`Redis is Connected on Port ${REDIS_PORT}`);
    })
    .on('ready', () => {
      logger.info(`Redis is Ready on Port ${REDIS_PORT}`);
    })
    .on('error', (e) => {
      logger.error('Redis Error: ', e);
    })
    .on('close', () => {
      logger.info('Redis is closed');
    })
    .on('reconnecting', () => {
      logger.info('Redis is reconnecting ...');
    })
    .on('end', () => {
      logger.info('Redis connection is disconnected');
    });

const redisStore = new RedisStore({
  host: 'localhost',
  port: REDIS_PORT,
  client: redisClient,
  ttl: 604800,
});

const getAllActiveSessions = () => {
  return new Promise((resolve, reject) => {
    redisStore.all(function(err, sessions) {
      if (err) reject(err);
      else resolve(sessions);
    });
  });
};

export {redisStore, getAllActiveSessions};
