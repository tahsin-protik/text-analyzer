import sequelize from './database';
import Text from '../models/text';
import '../models';

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false }); // Set to true only for development
    console.log('Database synced');
  } catch (error) {
    console.error('Failed to sync database:', error);
  }
};

export default syncDatabase;
