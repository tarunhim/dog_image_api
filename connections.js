const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.LOGIN_ID, process.env.DB_PASSWORD, {
  logging: false,
  host: process.env.DB_HOST,
  dialect: 'postgres',
  ssl: true,
  port: process.env.DB_PORT,
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
