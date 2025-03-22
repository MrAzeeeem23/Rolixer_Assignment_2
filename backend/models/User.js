import sequelize from "../database/db.js";
import { DataTypes } from "sequelize";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from 'dotenv';

dotenv.config()

// class User extends Model{
//     async PasswordCorrect() {
//       const salt = await bcrypt.genSalt(10);
//       const x  = await bcrypt.hash(password, salt)
//       console.log(x)
//     }
// }

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "user", "store_owner"),
      allowNull: false,
      defaultValue: "user",
    },
    refreshT: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: true,
    // hooks: {
    //   beforeCreate: async (user) => {
    //       const salt = await bcrypt.genSalt(10);
    //       user.password = bcrypt.hash(user.password, salt)
    //   },
    //   beforeUpdate: async (user) => {
    //       const salt = await bcrypt.genSalt(10);
    //       user.password = bcrypt.hash(user.password, salt)
    //   }
    // }
  }
);

User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

User.prototype.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

User.prototype.generateAccessToken = function () {
  return jwt.sign(
    {
      id: this.id,
      name: this.name,
      email: this.email,
    },
    process.env.JWT_ACCESSTOKEN_KEY,
    {
      expiresIn: process.env.TOKEN_ACCESSTOKEN_EXPIRES_IN,
    }
  );
};

User.prototype.refreshToken = function () {
  return jwt.sign(
    {
      id: this.id,
    },
    process.env.JWT_REFRESHTOKEN_KEY,
    {
      expiresIn: process.env.TOKEN_REFRESHTOKEN_EXPIRES_IN,
    }
  );
};

export default User;
