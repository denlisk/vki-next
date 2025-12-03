'use client';
import styles from './Student.module.scss';
import BackToStudents from './BackToStudents/BackToStudents';
import useStudents from '@/hooks/useStudents';
import { useParams } from 'next/navigation';

const Student = (): React.ReactElement => {
  const { id } = useParams();
  const studentId = parseInt(id!.toString());
  const student = useStudents().students.find(t => t.Id === studentId);
  const onDeleteHandler = (): void => {

  };

  return (
    <>
      <BackToStudents />
      <article className={`${styles.Student}
      ${student?.IsDeleted ? '--isDeleted' : ''}`}
      >
        {student?.LastName}
        &nbsp;
        {student?.FirstName}
        &nbsp;
        {student?.MiddleName || ''}
        &nbsp;
        {student?.Group?.Name || ''}
        &nbsp;
        {student?.Contacts || ''}
        <button onClick={onDeleteHandler}>Удалить</button>
      </article>
    </>
  );
};

export default Student;
