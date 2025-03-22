import { DataTypes } from "sequelize";
import sequelize from "../database/db";
import User from "./User";
import Store from "./Store";

const Rating = sequelize.define("Rating", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        },
        onDelete: "CASCADE"
    },
    storeId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Store,
            key: "id"
        },
        onDelete: "CASCADE"
    },
    rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 1,
            max: 5,
        }
    }
}, {
    timestamps: true
})

export default Rating;