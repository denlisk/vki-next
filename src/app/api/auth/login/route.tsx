import { NextResponse, type NextRequest } from 'next/server';
import { userService } from '@/services/UserService';
import { signJwt } from '@/utils/jwt';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { Email, Password } = body ?? {};

    if (!Email || !Password) {
      return NextResponse.json(
        { message: 'Укажите email и пароль' },
        { status: 400 },
      );
    }

    const user = await userService.verifyCredentials(Email, Password);

    if (!user || !user.IsActive) {
      return NextResponse.json(
        { message: 'Неверный логин или пароль' },
        { status: 401 },
      );
    }

    const token = signJwt({
      sub: user.Id,
      Email: user.Email,
      FullName: user.FullName,
    });

    const response = NextResponse.json({
      token,
      user: {
        Id: user.Id,
        Email: user.Email,
        FullName: user.FullName,
      },
    });

    response.cookies.set({
      name: 'accessToken',
      value: token,
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60, // 1 hour
    });

    return response;
  }
  catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Ошибка авторизации' },
      { status: 500 },
    );
  }
}
