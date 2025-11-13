import type StudentInterface from '@/types/StudentInterface';
import Link from 'next/link';
import { Form, useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { addStudentApi } from '@/api/studentsApi';
import useStudents from '@/hooks/useStudents';

const BackToStudents = (): React.ReactElement => {
    return (
        <span>
            <Link href="/students">Назад</Link>
        </span>
    );
};

export default BackToStudents;
