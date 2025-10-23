import type StudentInterface from '@/types/StudentInterface';
import styles from './Student.module.scss';
import Link from 'next/link';

interface Props {
  student: StudentInterface;
  onDelete: (id: number) => void;
}

const Student = ({ student, onDelete }: Props): React.ReactElement => {
  const onDeleteHandler = (): void => {
    onDelete(student.id);
    student.isDeleted = true;
  };

  return (
    <tr className={`${styles.Student} ${student.isDeleted ? '--isDeleted' : student.isNew ? '--isNew' : ''} `}>
      <td>
        {student.id}
      </td>
      <td>
        {student.uuid}
      </td>
      <td>
        {student.lastName}
      </td>
      <td>
        {student.firstName}
      </td>
      <td>
        {student.middleName}
      </td>
      <td>
        {student.groupId}
      </td>
      <td>
        {student.contacts}
      </td>
      <td>
        <Link href={`/students/${student.id}`}>Открыть</Link>
        <button onClick={onDeleteHandler}>Удалить</button>
      </td>
    </tr>
  );
};

export default Student;
