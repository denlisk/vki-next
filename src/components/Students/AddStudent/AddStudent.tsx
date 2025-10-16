import type StudentInterface from '@/types/StudentInterface';
import styles from './AddStudent.module.scss';
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
    <form className={`${styles.AddStudent}`} onSubmit={handleSubmit(onSubmit)}>
      <span>Имя</span>
      <input type="text" {...register('fName', { required: true })} />
      <span>Фамилия</span>
      <input type="text" {...register('lName', { required: true })} />
      <span>Отчество</span>
      <input type="text" {...register('sName', { required: true })} />
      <span>Группа</span>
      <input type="nubmer" {...register('gId', { required: true })} />
      <input value="asd" type="submit" />
    </form>
  );
};

export default AddStudent;
