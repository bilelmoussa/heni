import express from 'express';
import { urlencoded, json } from 'express';
import http from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
//  import path from 'path';
import session from 'express-session';
import csrf from 'csurf';
//  import { NODE_ENV } from './config';

//  import { redisStore } from './redis';

const createApp = () => {
  //   CREATE EXPRESS APP SERVER
  const app = express();

  // CREATE HTTP SERVER
  const server = http.createServer(app);

  //  USE BODY PARSER
  app.use(json({ strict: true, type: 'application/json' }));

  // ENCODE URL
  app.use(urlencoded({ extended: true }));

  //  COOKIE PARSER
  app.use(cookieParser());

  // COMPRESS FILES
  app.use(compression());

  //  CROSS BROWER
  app.use(cors());

  //  SECURE HEADERS
  app.use(helmet());

  // FOR REVERSED PROXY USERS
  app.enable('trust proxy');

  //  INITIALIZE EXPRESS-SESSION TO TRACK THE LOGGED-IN USER ACROSS SESSIONS.
  app.use(session({
    name: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 600000,
      httpOnly: true,
      signed: true,
    },
    //  store: redisStore
  }));

  // INITIALIZE CSURF PROTECTION
  const csrfProtection = csrf({ cookie: true });

  //  LIMIT THE AMOUNT OF THE REQUEST OF API
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
  });

  //  API ENDPOINT
  app.use('/api/', apiLimiter);

  // API ADMIN ENDPOINT
  app.use('/api/admin', csrfProtection);

  //  SEND CSURF TOKEN
  app.get('/api/admin/', (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
  });

  app.get('/', (req, res) => {
    res.json({ data: 'success' });
  });

  //  SERVE STATIC FILES
  /*
  if (NODE_ENV && NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../client/build')));
  }
  */

  return { server };
};

export default createApp;
