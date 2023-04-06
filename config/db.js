const {Sequelize} = require('sequelize');
require('sequelize-hierarchy')(Sequelize);
const dotenv = require("dotenv");
dotenv.config({path:'./config/.env'});

const {POSTGRES_URL} =process.env;

const db = new Sequelize(POSTGRES_URL);

const connectDb = async () => {
    await db.authenticate()
    console.log('Database connection successful!')
}


module.exports= {connectDb, db};