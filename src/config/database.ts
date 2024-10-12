import { Sequelize, Dialect } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

type Environment = 'development' | 'test' | 'production';

const env: Environment = process.env.NODE_ENV as Environment || 'development';

const databaseConfig = {
  development: {
    database: process.env.DB_NAME_DEV as string,
    username: process.env.DB_USERNAME as string,
    password: process.env.DB_PASSWORD as string,
    host: process.env.DB_HOST,
    dialect: 'postgres' as String
  },
  test: {
    database: process.env.DB_NAME_TEST as string,
    username: process.env.DB_USERNAME as string,
    password: process.env.DB_PASSWORD as string,
    host: process.env.DB_HOST,
    dialect: 'postgres' as String
  },
  production: {
    database: process.env.DB_NAME_PROD as string,
    username: process.env.DB_USERNAME as string,
    password: process.env.DB_PASSWORD as string,
    host: process.env.DB_HOST,
    dialect: 'postgres' as String
  },
};

const currentConfig = databaseConfig[env];

console.log('Current Config:', currentConfig);

const sequelize = new Sequelize(
  currentConfig.database,
  currentConfig.username,
  currentConfig.password,
  {
    host: currentConfig.host,
    dialect: currentConfig.dialect as Dialect,
  }
);

export default sequelize;
