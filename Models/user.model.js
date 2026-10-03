import { DataTypes } from 'sequelize';
import sequelize from '../Utils/db.js';

const User = sequelize.define(
  'users',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: { isEmail: true }
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    role : DataTypes.ENUM('admin', 'user'),
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, allowNull: true },
    deleted_at: { type: DataTypes.DATE, allowNull: true }
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    paranoid: true,
    deletedAt: 'deleted_at',

    defaultScope: {
      attributes: { exclude: ['created_at', 'updated_at', 'deleted_at' , 'password'] }
    },
    scopes: {
      withDeleted: {
        attributes: { include: ['deleted_at'] }
      },
      withPassword: {
        attributes: { include: ['password'] }
      }
    }
  }
);

export default User;
