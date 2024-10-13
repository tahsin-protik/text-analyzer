import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface TextAttributes {
  id: number;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface TextCreationAttributes extends Optional<TextAttributes, 'id'> {}

class Text extends Model<TextAttributes, TextCreationAttributes> implements TextAttributes {
  public id!: number;
  public content!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Text.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Text',
    tableName: 'texts',
    timestamps: true,
  }
);

export default Text;
