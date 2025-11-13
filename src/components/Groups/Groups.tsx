'use client';

import useGroups from '@/hooks/useGroups';
import type GroupInterface from '@/types/GroupInterface';
import styles from './Groups.module.scss';
import type StudentInterface from '@/types/StudentInterface';
import Student from '../Students/Student';
import Link from 'next/link';

const Groups = (): React.ReactElement => {
  const { groups } = useGroups();

  return (
    <div className={styles.Groups}>
      {groups.map((group: GroupInterface) => (
        <div key={group.id}>
          <h2>
            Группа &nbsp;
            {group.name}
          </h2>
          <div>
            {group.contacts}
          </div>
          {group.students
            ? (
              <table className={styles.Students}>
                <thead>
                  <tr>
                    <th>Фамилия</th>
                    <th>Имя</th>
                    <th>Отчество</th>
                    <th>Контакты</th>
                    <th>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {group.students?.map((student: StudentInterface) => (
                    <tr key={student.id || student.uuid} className={`${student.isDeleted ? '--isDeleted' : student.isNew ? '--isNew' : ''} `}>
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
                        {student.contacts}
                      </td>
                      <td>
                        <Link href={`students/${student.id}`}>Профиль</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
            : (
              <div>
                Студентов нет.
              </div>
            )}
        </div>
      ))}
    </div>
  );
};

export default Groups;
