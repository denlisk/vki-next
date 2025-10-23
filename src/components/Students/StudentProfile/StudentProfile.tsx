import type StudentInterface from '@/types/StudentInterface';
import styles from './Student.module.scss';

const StudentProfile = (student: StudentInterface): React.ReactElement => {
  const onDeleteHandler = (): void => {

  };

  return (
    <article className={`${styles.Student}
      ${student.isDeleted ? ['--isDeleted'] : ''}`}
    >
      {student.lastName}
      {student.firstName}
      {student.middleName}
      {student.groupId}
      <button onClick={onDeleteHandler}>Удалить</button>
    </article>
  );
};

export default StudentProfile;
