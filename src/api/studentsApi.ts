import type StudentInterface from '@/types/StudentInterface';

export const getStudentsApi = async (): Promise<StudentInterface[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}students`);

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
    const students = await response.json() as StudentInterface[];
    return students;
  }
  catch (err) {
    console.log('>>> getGroupsApi', err);
    return [] as StudentInterface[];
  }
};

export const deleteStudentApi = async (studentId: number): Promise<number> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}students/${studentId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
  }
  catch (err) {
    console.log('>>> deleteStudentApi', err);
  }
  return -1;
};

export const addStudentApi = async (student: StudentInterface): Promise<StudentInterface> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}students`, {
      method: 'POST',
      body: JSON.stringify(student),
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
    student = await response.json();
  }
  catch (err) {
    console.log('>>> addStudentApi', err);
  }
  return student;
};
