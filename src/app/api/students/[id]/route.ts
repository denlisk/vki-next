import { deleteStudentDb } from '@/db/studentDb';
import { type NextRequest } from 'next/server';

export async function DELETE(request: NextRequest, context: { params: Promise<{ Id: number }> }): Promise<void | Response> {
  const p = await context.params;
  const studentId = await p.Id;

  const deletedStudentId = await deleteStudentDb(studentId);

  return new Response(JSON.stringify({ deletedStudentId }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
