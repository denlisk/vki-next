import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Group } from './entity/Group.entity';
import { Student } from './entity/Student.entity';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DB ?? './db/vki-web.db', // Path to your SQLite database file
  synchronize: true, // Auto-create schema on startup (use with caution in production)
  logging: false,
  entities: [Student, Group],
});

// to initialize the initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
export const dbInit = async (): Promise<void> => {
  try {
    if (AppDataSource.isInitialized) {
      console.log('>>> AppDataSource.isInitialized');
      return;
    }
    await AppDataSource.initialize();
    console.log('>>> AppDataSource.initialize');
  }
  catch (error) {
    console.log(error);
  }
};

// await AppDataSource.initialize()
//   .then(() => {
//     console.log('Data Source has been initialized!');
//     // You can now interact with your entities
//   })
//   .catch((err) => {
//     console.error('Error during Data Source initialization:', err);
//   });

export default AppDataSource;
