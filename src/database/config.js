require('dotenv').config();

module.exports = {
  development: {
    dialect: process.env.DIALECT || 'postgres',
    use_env_variable: 'DATABASE_URL',
  },
  test: {
    dialect: process.env.DIALECT || 'postgres',
    use_env_variable: 'TEST_DATABASE_URL',
  },
  production: {
    dialect: process.env.DIALECT || 'postgres',
    use_env_variable: 'DATABASE_URL',
  },
};
