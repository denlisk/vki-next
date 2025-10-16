import Page from '@/components/layout/Page/Page';
import Student from '@/components/Students/Student/Student';
import StudentProfile from '@/components/Students/StudentProfile/StudentProfile';
import StudentInterface from '@/types/StudentInterface';
import { type Metadata } from 'next/types';

export const metadata: Metadata = {
  title: 'Группы - Вэб разработка ВКИ - Next.js шаблон',
  description: 'Шаблон для веб-разработки с использованием Next.js, React Hook Form, Yup, SCSS, Eslint, TanStack Query (React Query)',
};

const StudentPage = (student: StudentInterface): React.ReactNode => (
  <Page>
    <h1>Профиль студента</h1>
    <StudentProfile id={student.id} first_name={student.first_name} last_name={student.last_name} middle_name={student.middle_name} groupId={student.groupId} />
  </Page>
);

export default StudentPage;
