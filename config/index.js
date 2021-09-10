require('dotenv').config();

module.exports = {
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 5000,
    secret: process.env.SECRET_KEY, 
    db: {
      database: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
  };
