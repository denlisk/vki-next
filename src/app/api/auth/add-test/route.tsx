import { hashPassword } from '@/utils/password';
import { User } from '@/db/entity/User.entity';
import AppDataSource from '@/db/AppDataSource';

const defaultUsers = [
  {
    Email: 'admin@example.com',
    FullName: 'Администратор Системы',
    Password: hashPassword('admin123'),
  },
  {
    Email: 'manager@example.com',
    FullName: 'Менеджер Учебного Отдела',
    Password: hashPassword('manager123'),
  },
];

export async function GET(): Promise<Response> {
  let newUsers: number = 0;
  let existUsers: number = 0;
  const repository = AppDataSource.getRepository(User);

  await Promise.all(defaultUsers.map(async (user) => {
    const exists = await repository.findOne({
      where: { Email: user.Email },
    });

    if (!exists) {
      await repository.save(repository.create(user));
      newUsers++;
    }
    else {
      existUsers++;
    }
  }));

  return new Response(JSON.stringify({
    newUsers,
    existUsers,
  }), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
