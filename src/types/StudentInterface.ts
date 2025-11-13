import type { Group } from "@/db/entity/Group.entity";

interface StudentInterface {
  id: number;
  uuid?: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  contacts?: string;
  isDeleted?: boolean;
  isNew?: boolean;
  group?: Group;
};

export default StudentInterface;
