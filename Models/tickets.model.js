import { DataTypes } from 'sequelize';
import sequelize from '../Utils/db.js';

const Issues = sequelize.define(
  'issues',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.STRING,
    },
    description: DataTypes.TEXT,
    phone: DataTypes.STRING,
    status : DataTypes.ENUM('open', 'in progress' , 'resolved' , 'closed'),
    priority : DataTypes.ENUM('low', 'medium' , 'high'),
    created_by : DataTypes.UUID,
    assigned_to : DataTypes.UUID,
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

    // hide timestamps by default
    defaultScope: {
      attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] }
    },
    scopes: {
      withDeleted: {
        attributes: { include: ['deleted_at'] }
      }
    }
  }
);

export default Issues;
