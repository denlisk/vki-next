import type StudentInterface from '@/types/StudentInterface';
import styles from './AddStudent.module.scss';
import Link from 'next/link';
import { Form, useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { addStudentApi } from '@/api/studentsApi';
import useStudents from '@/hooks/useStudents';

export type FormFields = Pick<StudentInterface, 'firstName' | 'lastName' | 'middleName' | 'groupId'>;

interface Props {
  onAdd: (studentForm: FormFields) => void;
}

type FormValues = {
  fName: string;
  lName: string;
  sName: string;
  gId: number;
};

const AddStudent = ({ onAdd }: Props): React.ReactElement => {
  const { register, handleSubmit } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = studentForm => onAdd(studentForm);

  return (
    <form className={`${styles.AddStudent}`} onSubmit={handleSubmit(onSubmit)}>
      <span>Имя</span>
      <input type="text" {...register('firstName', { required: true })} />
      <span>Фамилия</span>
      <input type="text" {...register('lastName', { required: true })} />
      <span>Отчество</span>
      <input type="text" {...register('middleName', { required: true })} />
      <span>Группа</span>
      <input type="number" {...register('groupId', { required: true })} />
      <input value="Добавить" type="submit" />
    </form>
  );
};

export default AddStudent;
