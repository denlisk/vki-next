import StudentInterface from '@/types/StudentInterface';
import styles from './Student.module.scss';
import BackToStudents from './BackToStudents/BackToStudents';
import useStudents from '@/hooks/useStudents';
import { useParams } from 'next/navigation';

const Student = (): React.ReactElement => {
  const { id } = useParams();
  const studentId = parseInt(id!.toString());
  const student = useStudents().students.find(t => t.id === studentId);
  const onDeleteHandler = (): void => {

  };

  return (
    <>
      <BackToStudents />
      <article className={`${styles.Student}
      ${student?.isDeleted ? '--isDeleted' : student?.isNew ? '--isNew' : ''}`}
      >
        {student?.lastName}
                &nbsp;
        {student?.firstName}
                &nbsp;
        {student?.middleName}
                &nbsp;
        {student?.group?.name}
                &nbsp;
        {student?.contacts}
        <button onClick={onDeleteHandler}>Удалить</button>
      </article>
    </>
  );
};

export default Student;
