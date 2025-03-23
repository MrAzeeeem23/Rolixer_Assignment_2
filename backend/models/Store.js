import sequelize from "../database/db.js";
import { DataTypes } from "sequelize";

const Store = sequelize.define("Store", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ratings: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    }
},{
    timestamps: true
})

export default Store;