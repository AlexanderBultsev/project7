module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "4002",
  DB: "tldb",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};