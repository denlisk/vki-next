'use client';

import useGroups from '@/hooks/useGroups';
import type GroupInterface from '@/types/GroupInterface';
import styles from './Groups.module.scss';
import type StudentInterface from '@/types/StudentInterface';
import Link from 'next/link';

const Groups = (): React.ReactElement => {
  const { groups } = useGroups();

  return (
    <div className={styles.Groups}>
      {groups.map((group: GroupInterface) => (
        <div key={group.Id}>
          <h2>
            Группа &nbsp;
            {group.Name}
          </h2>
          <div>
            {group.Contacts}
          </div>
          {group.Students
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
                  {group.Students.map((student: StudentInterface) => (
                    <tr key={student.Id || student.UUID} className={`${student.IsDeleted ? '--isDeleted' : ''} `}>
                      <td>
                        {student.LastName}
                      </td>
                      <td>
                        {student.FirstName}
                      </td>
                      <td>
                        {student.MiddleName}
                      </td>
                      <td>
                        {student.Contacts}
                      </td>
                      <td>
                        <Link href={`students/${student.Id}`}>Профиль</Link>
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
