import { Sequelize } from "sequelize";
import dotenv from 'dotenv'

dotenv.config()

const sequelize = new Sequelize(
    process.env.PG_DATABASE_NAME, // db-name
    process.env.PG_USERNAME, // db-username
    process.env.PG_USERNAME, // db-pass
    {
        host: "localhost",
        dialect: "postgres",
        port: 5433,
        logging: false
    }
    )
    


export default sequelize;