import type { Group } from '@/db/entity/Group.entity';

interface StudentInterface {
  Id: number;
  UUID?: string;
  FirstName: string;
  LastName: string;
  MiddleName?: string;
  Contacts?: string;
  IsDeleted: boolean;
  Group?: Group;
  GroupId?: number;
};

export default StudentInterface;
