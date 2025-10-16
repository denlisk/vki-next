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
    <tr className={`${styles.Student} ${student.isDeleted ? styles['--isDeleted'] : ''} `}>
      <td>
        {student.last_name}
      </td>
      <td>
        {student.first_name}
      </td>
      <td>
        {student.middle_name}
      </td>
      <td>
        {student.groupId}
      </td>
      <td>
        <Link href={`/students/${student.id}`}>Открыть</Link>
        <button onClick={onDeleteHandler}>Удалить</button>
      </td>
    </tr>
  );
};

export default Student;
