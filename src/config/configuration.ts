
export default () => ({
  database: {
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dbname: process.env.DB_NAME,
  }
});
