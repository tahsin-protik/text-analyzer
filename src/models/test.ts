import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database'; // Now correctly imports the Sequelize instance

// Define the attributes for the Test model
interface TestAttributes {
  id: number;
}

// Define the creation attributes for the Test model
interface TestCreationAttributes extends Optional<TestAttributes, 'id'> {}

// Define the Test model
class Test extends Model<TestAttributes, TestCreationAttributes> implements TestAttributes {
  public id!: number; // '!' is used to indicate that this field is non-nullable

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the Test model
Test.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize, // Pass the sequelize instance
    modelName: 'Test', // Model name
    tableName: 'tests', // Table name
    timestamps: true, // Enable timestamps
  }
);

export default Test;
