import type { Student } from '@/db/entity/Student.entity';

interface GroupInterface {
  Id: number;
  Name: string;
  Contacts: string;
  Students: Student[];
};

export default GroupInterface;
