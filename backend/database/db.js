import { Sequelize } from "sequelize";
import dotenv from 'dotenv'

dotenv.config()

const sequelize = new Sequelize(
    "rolixer", // db-name
    "postgres", // db-username
    "azeemkhan", // db-pass
    {
        host: "localhost",
        dialect: "postgres",
        port: 5433,
        logging: false
    }
    )
    


export default sequelize;