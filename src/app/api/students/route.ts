import { addStudentDb, getStudentsDb } from '@/db/studentDb';
import StudentInterface from '@/types/StudentInterface';
import { NextApiRequest } from 'next';
import { NextRequest } from 'next/server';

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
  await addStudentDb(student);

  return new Response(JSON.stringify(student), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
