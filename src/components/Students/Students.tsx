'use client';

import useStudents from '@/hooks/useStudents';
import type StudentInterface from '@/types/StudentInterface';
import styles from './Students.module.scss';
import Link from 'next/link';
import Student from './Student/Student';
import { deleteStudentApi } from '@/api/studentsApi';
import { useMutation } from '@tanstack/react-query';
import AddStudent, { FormFields } from './AddStudent/AddStudent';
import { v4 as uuidv4 } from 'uuid';

const Students = (): React.ReactElement => {
  const { students, addStudentMutate, deleteStudentMutate } = useStudents();

  async function addTest(): Promise<void> {
    await fetch(`${process.env.NEXT_PUBLIC_API}students/add-test`, {
      method: 'POST',
    });
  }

  const addStudent = (studentFormField: FormFields): void => {
    addStudentMutate({
      id: -1,
      ...studentFormField,
      uuid: uuidv4(),
    });
  }

  const onDeleteHandler = (studentId: number): void => {
    deleteStudentMutate(studentId);
  };

  return (
    <>
      <AddStudent onAdd={addStudent} />
      <table className={styles.Students}>
        <thead>
          <tr>
            <th>Id</th>
            <th>UUID</th>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>Номер группы</th>
            <th>Контакты</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student: StudentInterface) => (
            <Student key={student.id || student.uuid} onDelete={onDeleteHandler} student={student} />
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
