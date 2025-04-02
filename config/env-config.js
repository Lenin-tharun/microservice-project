export default {
 /* kafka: {
    broker: process.env.KAFKA_BROKER || 'localhost:9092',
  },*/
  db: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'db_projects',
  },
};
