import AppDataSource from '@/db/AppDataSource';
import { Student } from '@/db/entity/Student.entity';
import type StudentInterface from '@/types/StudentInterface';
import getRandomFio from '@/utils/getRandomFio';

export class StudentService {
  private get repository(): ReturnType<typeof AppDataSource.getRepository> {
    // Check if AppDataSource is initialized
    if (!AppDataSource.isInitialized) {
      throw new Error('AppDataSource is not initialized');
    }
    // await dbInit();
    return AppDataSource.getRepository(Student);
  }

  async getStudents(): Promise<StudentInterface[]> {
    const students = await this.repository.find({ relations: ['Group'] });
    return students as StudentInterface[];
  }

  async getStudentById(Id: number): Promise<Student | null> {
    return await this.repository.findOne({
      where: { Id: Id },
      relations: ['Group'],
    }) as Student | null;
  }

  async deleteStudent(studentId: number): Promise<number> {
    await this.repository.delete(studentId);
    return studentId;
  }

  async addStudent(studentFields: Omit<StudentInterface, 'Id'>): Promise<StudentInterface> {
    const student = new Student();
    const newStudent = await this.repository.save({
      ...student,
      ...studentFields,
    });
    return newStudent;
  }

  async addRandomStudents(amount: number = 10): Promise<StudentInterface[]> {
    const students: StudentInterface[] = [];

    for (let i = 0; i < amount; i++) {
      const fio = getRandomFio();

      const newStudent = await this.addStudent({
        ...fio,
        Contacts: 'contact',
        GroupId: Math.floor(Math.random() * 4) + 1,
        IsDeleted: false,
      });
      students.push(newStudent);

      console.log(newStudent);
    }

    return students;
  }
}

export const studentService = new StudentService();
