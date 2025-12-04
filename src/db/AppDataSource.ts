import 'reflect-metadata';
import { DataSource, type DataSourceOptions } from 'typeorm';
import { Group } from './entity/Group.entity';
import { Student } from './entity/Student.entity';
import { User } from './entity/User.entity';

// const AppDataSource = new DataSource({
//   type: 'sqlite',
//   database: process.env.DB ?? './db/vki-web.db', // Path to your SQLite database file
//   synchronize: true, // Auto-create schema on startup (use with caution in production)
//   logging: false,
//   entities: [Student, Group, User],
//   migrationsRun: process.env.NODE_ENV === 'production',
// });
const timeout = 30000;

const config: DataSourceOptions = {
  ...(process.env.POSTGRES
    ? {
      type: 'postgres',
      url: process.env.POSTGRES,
      ssl: true,
      connectTimeoutMS: timeout,
      extra: {
        ssl: { rejectUnauthorized: false },
        connectionTimeoutMillis: timeout,
        query_timeout: timeout,
        idle_in_transaction_session_timeout: timeout,
      },
    }
    : {
      type: 'sqlite',
      database: process.env.DB ?? './db/vki-web-orm.db',
    }),
  synchronize: process.env.NODE_ENV !== 'production',
  migrationsRun: process.env.NODE_ENV === 'production',
  logging: true,
  entities: [Student, Group, User],
};

const AppDataSource = new DataSource(config);

await AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    // You can now interact with your entities
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

export default AppDataSource;
