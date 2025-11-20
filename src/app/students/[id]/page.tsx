import Page from '@/components/layout/Page/Page';
import Student from '@/components/Students/Student';

const StudentPage = (): React.ReactNode => (
  <Page>
    <h1>Профиль студента</h1>
    <Student />
  </Page>
);

export default StudentPage;
