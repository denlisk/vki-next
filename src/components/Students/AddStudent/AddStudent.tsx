import type StudentInterface from '@/types/StudentInterface';
import styles from './Student.module.scss';
import Link from 'next/link';
import { Form, useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { addStudentApi } from '@/api/studentsApi';
import useStudents from '@/hooks/useStudents';

type FormValues = {
  fName: string;
  lName: string;
  sName: string;
  gId: number;
};

const AddStudent = (): React.ReactElement => {
  const { register, handleSubmit } = useForm<FormValues>();
  const { addStudentMutate } = useStudents();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const student: StudentInterface = {
      id: 0,
      first_name: data.fName,
      last_name: data.lName,
      middle_name: data.sName,
      groupId: data.gId,
    };
    addStudentMutate(student);
    console.log(student);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Имя</label>
      <input type="text" {...register('fName', { required: true })} />
      <label>Фамилия</label>
      <input type="text" {...register('lName', { required: true })} />
      <label>Отчество</label>
      <input type="text" {...register('sName', { required: true })} />
      <label>Группа</label>
      <input type="nubmer" {...register('gId', { required: true })} />
      <input type="submit" />
    </form>
  );
};

export default AddStudent;
