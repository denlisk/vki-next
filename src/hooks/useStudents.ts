import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { addStudentApi, deleteStudentApi, getStudentsApi } from '@/api/studentsApi';
import type StudentInterface from '@/types/StudentInterface';
import isServer from '@/utils/isServer';

interface StudentsHookInterface {
  students: StudentInterface[];
  addStudentMutate: (student: StudentInterface) => void;
  deleteStudentMutate: (studentId: number) => void;
}

const useStudents = (): StudentsHookInterface => {
  const queryClient = useQueryClient();

  const { data, refetch } = useQuery({
    queryKey: ['students'],
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
      await queryClient.cancelQueries({ queryKey: ['students'] });
      // получаем данные из TanStackQuery
      const previousStudents = queryClient.getQueryData<StudentInterface[]>(['students']);
      let updatedStudents = [...(previousStudents ?? [])];

      if (!updatedStudents) return;

      // помечаем удаляемую запись
      updatedStudents = updatedStudents.map((student: StudentInterface) => ({
        ...student,
        ...(student.id === studentId ? { isDeleted: true } : {}),
      }));
      // обновляем данные в TanStackQuery
      queryClient.setQueryData<StudentInterface[]>(['students'], updatedStudents);

      return { previousStudents, updatedStudents };
    },
    onError: (err, variables, context) => {
      console.log('>>> deleteStudentMutate  err', err);
      queryClient.setQueryData<StudentInterface[]>(['students'], context?.previousStudents);
    },
    // обновляем данные в случаи успешного выполнения mutationFn: async (studentId: number) => deleteStudentApi(studentId),
    onSuccess: async (studentId: number, variables, { previousStudents }) => {
      await queryClient.cancelQueries({ queryKey: ['students'] });
      // вариант 1 - запрос всех записей
      // refetch();

      // вариант 2 - удаление конкретной записи
      if (!previousStudents) {
        return;
      }
      const updatedStudents = previousStudents.filter((student: StudentInterface) => student.id !== studentId);
      queryClient.setQueryData<StudentInterface[]>(['students'], updatedStudents);
    },
    // onSettled: (data, error, variables, context) => {
    //   // вызывается после выполнения запроса в случаи удачи или ошибке
    //   console.log('>> deleteStudentMutate onSettled', data, error, variables, context);
    // },
  });

  const addStudentMutate = useMutation({
    mutationFn: async (newStudent: StudentInterface) => addStudentApi(newStudent),
    // оптимистичная мутация (обновляем данные на клиенте до API запроса delete)
    onMutate: async (newStudent: StudentInterface) => {
      await queryClient.cancelQueries({ queryKey: ['students'] });
      // получаем данные из TanStackQuery
      const previousStudents = queryClient.getQueryData<StudentInterface[]>(['students']);
      let updatedStudents = [...(previousStudents ?? [])];

      if (!updatedStudents) return;

      updatedStudents = updatedStudents.concat(newStudent);
      queryClient.setQueryData<StudentInterface[]>(['students'], updatedStudents);

      return { previousStudents, updatedStudents };
    },
    onError: (err, variables, context) => {
      console.log('>>> addStudentMutate  err', err);
      queryClient.setQueryData<StudentInterface[]>(['students'], context?.previousStudents);
    },
    onSuccess: async (student: StudentInterface, variables, { previousStudents }) => {
      await queryClient.cancelQueries({ queryKey: ['students'] });
      // вариант 1 - запрос всех записей
      // refetch();

      if (!previousStudents) {
        return;
      }
      const updatedStudents = previousStudents.concat(student);
      queryClient.setQueryData<StudentInterface[]>(['students'], updatedStudents);
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
