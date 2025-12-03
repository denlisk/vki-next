import { addStudentDb, getStudentsDb } from '@/db/studentDb';
import { type NextRequest } from 'next/server';

export async function GET(): Promise<Response> {
  const students = await getStudentsDb();

  return new Response(JSON.stringify(students), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export async function POST(req: NextRequest): Promise<Response> {
  const student = await req.json();
  delete student['Id'];
  const newStudent = await addStudentDb(student);

  return new Response(JSON.stringify(newStudent), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
