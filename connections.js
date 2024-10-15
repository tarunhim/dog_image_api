const { Sequelize } = require('sequelize');
require('dotenv').config();

const isTestEnvironment = process.env.NODE_ENV === 'test';
console.log("ldsjfklsfj", isTestEnvironment, process.env)
const db_name = isTestEnvironment ? process.env.TEST_DB_NAME : process.env.DB_NAME;
const login_id = isTestEnvironment ? process.env.TEST_LOGIN_ID : process.env.LOGIN_ID;
const db_password = isTestEnvironment ? process.env.TEST_DB_PASSWORD : process.env.DB_PASSWORD;
const db_host = isTestEnvironment ? process.env.TEST_DB_HOST : process.env.DB_HOST;
const db_port = isTestEnvironment ? process.env.TEST_DB_PORT : process.env.DB_PORT;

const sequelize = new Sequelize(db_name, login_id, db_password, {
  logging: false,
  host: db_host,
  dialect: 'postgres',
  ssl: true,
  port: db_port,
  dialectOptions: {
    // ssl: {
    //   require: true,
    //   rejectUnauthorized: false
    // },
    requestTimeout: (300000 * 5),
  },
  define: {
    freezeTableName: true
  },
  pool: {
    max: 10, // Maximum number of connections in the pool
    min: 0, // Minimum number of connections in the pool
    acquire: 20000, // Maximum time, in milliseconds, that a connection can be idle before being released
    idle: 20000 // Maximum time, in milliseconds, that a connection can be idle before being released
  }
});

sequelize.sync()
  .then(async () => {
    console.log("Database Successfully Connected...");
  })
  .catch(async(err) => {
    console.error("Database Connection Error:", err);
  });

module.exports.sequelize = sequelize;
