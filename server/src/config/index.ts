import { config } from 'dotenv';
config();

//  SERVER
const PORT = Number(process.env.PORT) || 8080;
const NODE_ENV = process.env.NODE_ENV ? String(process.env.NODE_ENV) : 'development';

//  REDIS PORT
const REDIS_PORT = Number(process.env.REDIS_PORT) || 6379;
const REDIS_SECRET = process.env.REDIS_SECRET ? String(process.env.REDIS_SECRET) : 'RedisSecret';

export {PORT, NODE_ENV, REDIS_PORT, REDIS_SECRET};

