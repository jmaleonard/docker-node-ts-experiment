import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';

module.exports = function(sequelize) : Model  {
  return sequelize.define('Files', {
    fileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    fileName: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    data: {
      type: DataTypes.JSONB,
      allowNull: false
    }
  }, {
      tableName: 'Files',
      timestamps: true
    });
}
