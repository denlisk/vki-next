import type StudentInterface from '@/types/StudentInterface';
import styles from './AddStudent.module.scss';
import { useForm, type SubmitHandler } from 'react-hook-form';
import type GroupInterface from '@/types/GroupInterface';

export type FormFields = Pick<StudentInterface, 'FirstName' | 'LastName' | 'MiddleName' | 'GroupId'>;

interface Props {
  onAdd: (studentForm: FormFields) => void;
  groups: GroupInterface[];
}
const AddStudent = ({ onAdd, groups }: Props): React.ReactElement => {
  const { register, handleSubmit } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = (studentForm) => {
    onAdd(studentForm);
  };

  return (
    <form className={`${styles.AddStudent}`} onSubmit={handleSubmit(onSubmit)}>
      <span>Имя</span>
      <input type="text" {...register('FirstName', { required: true })} />
      <span>Фамилия</span>
      <input type="text" {...register('LastName', { required: true })} />
      <span>Отчество</span>
      <input type="text" {...register('MiddleName')} />
      <span>Группа</span>
      <select {...register('GroupId')}>
        <option value={undefined}>
          Без группы
        </option>
        {groups.map((group: GroupInterface) => (
          <option key={group.Id} value={group.Id}>
            {group.Name}
          </option>
        ))}
      </select>
      <input value="Добавить" type="submit" />
    </form>
  );
};

export default AddStudent;
