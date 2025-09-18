'use client';

import useStudents from '@/hooks/useStudents';
import type StudentInterface from '@/types/StudentInterface';
import styles from './Students.module.scss';

const Students = (): React.ReactElement => {
  const { students } = useStudents();

  return (
    <table className={styles.Students}>
      <thead>
        <tr>
          <th>Фамилия</th>
          <th>Имя</th>
          <th>Отчество</th>
          <th>Номер группы</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student: StudentInterface) => (
          <>
            <tr>
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
            </tr>
          </>
        ))}
      </tbody>
    </table>
  );
};

export default Students;
