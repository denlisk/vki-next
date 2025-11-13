'use client';

import Page from '@/components/layout/Page/Page';
import Student from '@/components/Students/Student';
import { META_DESCRIPTION, META_TITLE } from '@/constants/meta';
import StudentInterface from '@/types/StudentInterface';
import { useParams } from 'next/navigation';
import { type Metadata } from 'next/types';
import { NavLink, Route } from 'react-router-dom';

const StudentPage = (): React.ReactNode => (
  <Page>
    <h1>Профиль студента</h1>
    <Student />
  </Page>
);

export default StudentPage;
