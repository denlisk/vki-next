interface StudentInterface {
  id: number;
  first_name: string;
  last_name: string;
  middle_name: string;
  isDeleted?: boolean;
  groupId: number;
};

export default StudentInterface;
