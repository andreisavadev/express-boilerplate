import { config } from 'dotenv';

config();

const appConfig = {
  apiVersion: '1.0.0',
  apiName: 'Express Boilerplate API',
  port: process.env.PORT || 3000,
  jwt: {
    secret: process.env.JWT_SECRET_KEY!,
    refreshSecretKey: process.env.JWT_REFRESH_SECRET_KEY!,
    expiresIn: '15d',
  },
  logRootPath: '.logs',
};

export default appConfig;
