import AppDataSource from '@/db/AppDataSource';
import { User } from '@/db/entity/User.entity';
import type UserInterface from '@/types/UserInterface';
import { hashPassword, verifyPassword } from '@/utils/password';

export class UserService {
  private get repository(): ReturnType<typeof AppDataSource.getRepository> {
    if (!AppDataSource.isInitialized) {
      throw new Error('AppDataSource is not initialized');
    }

    return AppDataSource.getRepository(User);
  }

  async findByEmail(Email: string): Promise<User | null> {
    return await this.repository.findOne({ where: { Email } }) as User;
  }

  async createUser(userData: Omit<UserInterface, 'Id' | 'Password'> & { Password: string }): Promise<User> {
    const user = this.repository.create({
      ...userData,
      Password: hashPassword(userData.Password),
    });

    return await this.repository.save(user) as User;
  }

  async verifyCredentials(Email: string, Password: string): Promise<User | null> {
    const user = await this.findByEmail(Email);

    if (!user) {
      return null;
    }

    const isValid = verifyPassword(Password, user.Password);

    if (!isValid) {
      return null;
    }

    return user;
  }
}

export const userService = new UserService();
