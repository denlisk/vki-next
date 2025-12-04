import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { addStudentApi, deleteStudentApi, getStudentsApi } from '@/api/studentsApi';
import type StudentInterface from '@/types/StudentInterface';

interface StudentsHookInterface {
  students: StudentInterface[];
  addStudentMutate: (student: StudentInterface) => void;
  deleteStudentMutate: (studentId: number) => void;
}

const useStudents = (): StudentsHookInterface => {
  const queryClient = useQueryClient();

  const { data, refetch } = useQuery({
    queryKey: ['Students'],
    queryFn: () => getStudentsApi(),
    enabled: false,
  });

  /**
   * Мутация удаления студента
   */
  const deleteStudentMutate = useMutation({
    // вызов API delete
    mutationFn: async (studentId: number) => deleteStudentApi(studentId),
    // оптимистичная мутация (обновляем данные на клиенте до API запроса delete)
    onMutate: async (studentId: number) => {
      await queryClient.cancelQueries({ queryKey: ['Students'] });
      // получаем данные из TanStackQuery
      const previousStudents = queryClient.getQueryData<StudentInterface[]>(['Students']);
      let updatedStudents = [...(previousStudents ?? [])];

      if (!updatedStudents) return;

      // помечаем удаляемую запись
      updatedStudents = updatedStudents.map((student: StudentInterface) => ({
        ...student,
        ...(student.Id === studentId ? { IsDeleted: true } : {}),
      }));
      // обновляем данные в TanStackQuery
      queryClient.setQueryData<StudentInterface[]>(['Students'], updatedStudents);

      // console.log('deleteStudentMutate: Мутация', previousStudents, updatedStudents);
      // debugger;

      return { previousStudents, updatedStudents };
    },
    onError: (err, variables, context) => {
      console.log('deleteStudentMutate: Ошибка', err);
      debugger;
      queryClient.setQueryData<StudentInterface[]>(['Students'], context?.previousStudents);
    },
    // обновляем данные в случаи успешного выполнения mutationFn: async (studentId: number) => deleteStudentApi(studentId),
    onSuccess: async () => {
      // console.log('deleteStudentMutate: Успешно', studentId);
      // debugger;
      await queryClient.cancelQueries({ queryKey: ['Students'] });
      // вариант 1 - запрос всех записей
      refetch();

      // вариант 2 - удаление конкретной записи
      // if (!previousStudents) {
      //   return;
      // }

      // const updatedStudentsNew = previousStudents.filter((student: StudentInterface) => student.Id !== studentId);
      // queryClient.setQueryData<StudentInterface[]>(['students'], updatedStudentsNew);

      // queryClient.invalidateQueries({ queryKey: ['groups'] });
    },
    // onSettled: (data, error, variables, context) => {
    //   console.log('>> deleteStudentMutate onSettled', data, error, variables, context);
    // },
  });

  const addStudentMutate = useMutation({
    mutationFn: async (newStudent: StudentInterface) => addStudentApi(newStudent),
    // оптимистичная мутация (обновляем данные на клиенте до API запроса delete)
    onMutate: async (newStudent: StudentInterface) => {
      await queryClient.cancelQueries({ queryKey: ['Students'] });
      // получаем данные из TanStackQuery
      const previousStudents = queryClient.getQueryData<StudentInterface[]>(['Students']);
      const updatedStudents = [...(previousStudents ?? [])];

      if (!updatedStudents) return;

      updatedStudents.push({
        ...newStudent,
      });
      queryClient.setQueryData<StudentInterface[]>(['Students'], updatedStudents);

      // console.log('addStudentMutate: Мутация', newStudent);
      // debugger;

      return { previousStudents, updatedStudents };
    },
    onError: (err, variables, context) => {
      console.log('addStudentMutate: Ошибка', err);
      queryClient.setQueryData<StudentInterface[]>(['Students'], context?.previousStudents);
    },
    onSuccess: async () => {
      // console.log('addStudentMutate: Успешно', student);
      // debugger;
      // await queryClient.cancelQueries({ queryKey: ['students'] });
      // вариант 1 - запрос всех записей
      refetch();
      queryClient.invalidateQueries({ queryKey: ['Groups'] });

      // if (!previousStudents) {
      //   queryClient.setQueryData<StudentInterface[]>(['students'], [student]);
      //   return;
      // }

      // const updatedStudentsNew = updatedStudents.map((_student: StudentInterface) => ({
      //   ...(_student.UUID === student.UUID ? student : _student),
      // }));
      // queryClient.setQueryData<StudentInterface[]>(['students'], updatedStudentsNew);
    },
    // onSettled: (data, error, variables, context) => {
    //   console.log('>> deleteStudentMutate onSettled', data, error, variables, context);
    // },
  });

  return {
    students: data ?? [],
    addStudentMutate: addStudentMutate.mutate,
    deleteStudentMutate: deleteStudentMutate.mutate,
  };
};

export default useStudents;
