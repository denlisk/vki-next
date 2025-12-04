import AppDataSource from '@/db/AppDataSource';
import { Group } from '@/db/entity/Group.entity';
import type GroupInterface from '@/types/GroupInterface';

export class GroupService {
  private get repository(): ReturnType<typeof AppDataSource.getRepository> {
    if (!AppDataSource.isInitialized) {
      throw new Error('AppDataSource is not initialized');
    }
    return AppDataSource.getRepository(Group);
  }

  async getGroups(): Promise<GroupInterface[]> {
    const groups = await this.repository.find({ relations: ['Students'] });
    return groups as GroupInterface[];
  }

  async getGroupsById(Id: number): Promise<GroupInterface> {
    const groups = await this.repository.findOne({ relations: ['Students'], where: { Id } });
    return groups as GroupInterface;
  }

  async addGroup(groupFields: Omit<GroupInterface, 'Id'>): Promise<GroupInterface> {
    const group = new Group();
    const newGroup = await this.repository.save({
      ...group,
      ...groupFields,
    });

    return newGroup;
  }
}

export const groupService = new GroupService();
