import { studentService } from '@/services/StudentService';
import { type NextRequest } from 'next/server';

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }): Promise<void | Response> {
  const p = await context.params;
  const studentId = await p.id;

  const deletedStudentId = await studentService.deleteStudent(Number(studentId));

  return new Response(JSON.stringify({ deletedStudentId }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
