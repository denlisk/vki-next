import type { Student } from '@/db/entity/Student.entity';

interface GroupInterface {
  id: number;
  name: string;
  contacts: string;
  students?: Student[];
};

export default GroupInterface;
