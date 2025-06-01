const { Sequelize } = require('sequelize');
require("dotenv").config();

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize("bxtwpqoesklqlb2gim9u", "u4ko2ugjz4b3gzmg","y2bY8vqA9GsZNxNYqEFR", {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
    logging: false
});

const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = { connect }