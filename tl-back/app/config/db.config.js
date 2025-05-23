module.exports = {
  HOST: "localhost",
  USER: "tluser",
  PASSWORD: "tlpassword",
  DB: "tldb",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};