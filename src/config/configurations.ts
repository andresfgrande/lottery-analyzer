export default () => ({
  database: {
    uri: process.env.MONGO_URI || 'localhost',
    dbName: process.env.DB_NAME ||'db_name',
  },
  app:{
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV,
  }
});
