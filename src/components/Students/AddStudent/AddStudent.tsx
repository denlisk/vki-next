import type StudentInterface from '@/types/StudentInterface';
import styles from './AddStudent.module.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import useGroups from '@/hooks/useGroups';
import GroupInterface from '@/types/GroupInterface';

export type FormFields = Pick<StudentInterface, 'firstName' | 'lastName' | 'middleName' | 'group'>;

interface Props {
  onAdd: (studentForm: FormFields) => void;
}
const AddStudent = ({ onAdd }: Props): React.ReactElement => {
  const { register, handleSubmit } = useForm<FormFields>();
  const { groups } = useGroups();

  const onSubmit: SubmitHandler<FormFields> = (studentForm) => {
    onAdd(studentForm);
  };

  return (
    <form className={`${styles.AddStudent}`} onSubmit={handleSubmit(onSubmit)}>
      <span>Имя</span>
      <input type="text" {...register('firstName', { required: true })} />
      <span>Фамилия</span>
      <input type="text" {...register('lastName', { required: true })} />
      <span>Отчество</span>
      <input type="text" {...register('middleName')} />
      <span>Группа</span>
      <select {...register('group'), { required: true }}>
        <option value={undefined}>
          Без группы
        </option>
        {groups.map((group: GroupInterface) => (
          <option key={group.id} value={JSON.stringify(group)}>
            {group.name}
          </option>
        ))}
      </select>
      <input value="Добавить" type="submit" />
    </form>
  );
};

export default AddStudent;
