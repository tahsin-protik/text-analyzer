import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database'; 


interface TestAttributes {
  id: number;
}

interface TestCreationAttributes extends Optional<TestAttributes, 'id'> {}

class Test extends Model<TestAttributes, TestCreationAttributes> implements TestAttributes {
  public id!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Test.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize, 
    modelName: 'Test', 
    tableName: 'tests', 
    timestamps: true, 
  }
);

export default Test;
