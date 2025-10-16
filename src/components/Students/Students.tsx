'use client';

import useStudents from '@/hooks/useStudents';
import type StudentInterface from '@/types/StudentInterface';
import styles from './Students.module.scss';
import Link from 'next/link';
import Student from './Student/Student';
import { deleteStudentApi } from '@/api/studentsApi';
import { useMutation } from '@tanstack/react-query';
import AddStudent from './AddStudent/AddStudent';
const Students = (): React.ReactElement => {
  const { students, addStudentMutate, deleteStudentMutate } = useStudents();

  async function addTest(): Promise<void> {
    await fetch(`${process.env.NEXT_PUBLIC_API}students/add-test`, {
      method: 'POST',
    });
  }

  const addStudent = (student: StudentInterface): void => {
    addStudentMutate(student);
  }

  const onDeleteHandler = (studentId: number): void => {
    deleteStudentMutate(studentId);
  };

  return (
    <>
      <AddStudent />
      <table className={styles.Students}>
        <thead>
          <tr>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>Номер группы</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student: StudentInterface) => (
            <Student key={student.id} onDelete={onDeleteHandler} student={student} />
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
