import sequelize from './database';
import '../models';

sequelize.sync()
  .then(() => console.log('Database synchronized'))
  .catch(err => console.error('Error synchronizing database:', err));