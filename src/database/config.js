require('dotenv').config();

module.exports = {
  development: {
    dialect: process.env.DB_DIALECT || 'postgres',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    quoteIdentifiers: false,
    logging: false,
    ...(process.env.DATABASE_URL ? {use_env_variable: 'DATABASE_URL'} : ''),
  },
  test: {
    dialect: process.env.TEST_DATABASE_DIALECT || 'postgres',
    username: process.env.TEST_DATABASE_USER,
    password: process.env.TEST_DATABASE_PASSWORD,
    database: process.env.TEST_DATABASE_NAME,
    host: process.env.TEST_DATABASE_HOST,
    logging: false,
    quoteIdentifiers: false,
    ...(process.env.DATABASE_URL ? {use_env_variable: 'TEST_DATABASE_URL'} : ''),
  },
  production: {
    dialect: process.env.DATABASE_DIALECT || 'postgres',
    username: process.env.PRODUCTION_DATABASE_USER,
    password: process.env.PRODUCTION_DATABASE_PASSWORD,
    database: process.env.PRODUCTION_DATABASE_NAME,
    host: process.env.PRODUCTION_DATABASE_HOST,
    quoteIdentifiers: false,
    logging: false,
    ...(process.env.DATABASE_URL ? {use_env_variable: 'DATABASE_URL'} : ''),
  },
};
