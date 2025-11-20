'use client';

import useStudents from '@/hooks/useStudents';
import type StudentInterface from '@/types/StudentInterface';
import styles from './Students.module.scss';
import Student from './Student/Student';
import AddStudent, { type FormFields } from './AddStudent/AddStudent';
import { v4 as uuidv4 } from 'uuid';
import useGroups from '@/hooks/useGroups';

const Students = (): React.ReactElement => {
  const { students, addStudentMutate, deleteStudentMutate } = useStudents();
  const { groups } = useGroups();

  async function addTest(): Promise<void> {
    await fetch(`${process.env.NEXT_PUBLIC_API}students/add-test`, {
      method: 'POST',
    });
  }

  const addStudent = (studentFormField: FormFields): void => {
    console.log('Добавление студента', studentFormField);
    debugger;

    addStudentMutate({
      Id: -1,
      ...studentFormField,
      UUID: uuidv4(),
      IsDeleted: false,
    });
  };

  const onDeleteHandler = (studentId: number): void => {
    console.log('Удаление студента', studentId);
    debugger;
    deleteStudentMutate(studentId);
  };

  return (
    <>
      <AddStudent onAdd={addStudent} groups={groups} />
      <table className={styles.Students}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>Группа</th>
            <th>Контакты</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student: StudentInterface) => (
            <Student key={student.Id || student.UUID} onDelete={onDeleteHandler} student={student} />
          ))}
          <tr>
            <td colSpan={5}>
              <button onClick={addTest}>Добавить тестовые данные</button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Students;
