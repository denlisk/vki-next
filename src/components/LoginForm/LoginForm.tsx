'use client';

import { useState, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import styles from './LoginForm.module.scss';
import { useAuth } from '@/hooks/useAuth';

type LoginFormValues = {
  Email: string;
  Password: string;
};

const LoginForm = (): ReactNode => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      Email: 'admin@example.com',
      Password: 'admin123',
    },
  });

  const onSubmit = async (values: LoginFormValues): Promise<void> => {
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      setUser(data.user);

      if (!response.ok) {
        throw new Error(data?.message ?? 'Ошибка авторизации');
      }

      window.localStorage.setItem('accessToken', data.token);
      setSuccess('Авторизация успешна! Токен сохранён в localStorage.');
    }
    catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : 'Ошибка авторизации',
      );
    }
  };

  return (
    <form className={styles.LoginForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="Email">
          Email
        </label>
        <input
          id="Email"
          className={styles.input}
          type="email"
          placeholder="admin@example.com"
          {...register('Email', { required: 'Email обязателен' })}
        />
        {errors.Email?.message && (
          <span className={styles.error}>{errors.Email.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="Password">
          Пароль
        </label>
        <input
          id="Password"
          className={styles.input}
          type="password"
          placeholder="••••••••"
          {...register('Password', { required: 'Пароль обязателен' })}
        />
        {errors.Password?.message && (
          <span className={styles.error}>{errors.Password.message}</span>
        )}
      </div>

      <div className={styles.actions}>
        <button className={styles.button} type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Загрузка...' : 'Войти'}
        </button>
        <p className={styles.hint}>
          После успешной авторизации токен сохраняется в localStorage по ключу
          <code>accessToken</code>
          .
        </p>
      </div>

      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}
    </form>
  );
};

export default LoginForm;
