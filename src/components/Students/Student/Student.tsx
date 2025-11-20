import type StudentInterface from '@/types/StudentInterface';
import styles from './Student.module.scss';
import Link from 'next/link';

interface Props {
  student: StudentInterface;
  onDelete: (id: number) => void;
}

const Student = ({ student, onDelete }: Props): React.ReactElement => {
  const onDeleteHandler = (): void => {
    student.IsDeleted = true;
    onDelete(student.Id);
  };

  return (
    <tr className={`${styles.Student} ${student.IsDeleted ? '--isDeleted' : ''} `}>
      <td>
        {student.Id}
      </td>
      <td>
        {student.UUID}
      </td>
      <td>
        {student.LastName}
      </td>
      <td>
        {student.FirstName}
      </td>
      <td>
        {student.MiddleName || ''}
      </td>
      <td>
        {student.Group?.Name || '-'}
      </td>
      <td>
        {student.Contacts || '-'}
      </td>
      <td>
        <Link href={`students/${student.Id}`}>Профиль</Link>
        <button onClick={onDeleteHandler}>Удалить</button>
      </td>
    </tr>
  );
};

export default Student;
