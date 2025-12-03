import Link from 'next/link';

const BackToStudents = (): React.ReactElement => {
  return (
    <span>
      <Link href="/students">Назад</Link>
    </span>
  );
};

export default BackToStudents;
