"use client";

import { useState } from 'react';
import { login } from '../actions/auth';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import SideInfoPanel from '../components/SideInfoPanel';
import AcessForm from '../components/acessForm';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [profile, setProfile] = useState<'estudante' | 'professor'>('estudante');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await login(data);
      if (response.success && response.data?.token) {
        localStorage.setItem('auth_token', response.data.token);
        router.push('/tasks');
      } else {
        setError(response.message || 'Erro ao fazer login.');
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full flex bg-blue-700">
      <SideInfoPanel />
      <div className="flex flex-col justify-center w-full md:w-1/2 bg-white p-6 sm:p-8 md:p-16 min-w-[320px] min-h-screen rounded-l-3xl">
        <AcessForm
          profile={profile}
          setProfile={setProfile}
          showProfileSelector={false}
          isLoading={isLoading}
          register={register}
          errors={errors}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          buttonLabel={isLoading ? 'Entrando...' : 'Entrar'}
          error={error}
          title="Bem-vindo de volta"
          subtitle="Acesse sua conta para continuar"
          isLogin={true}
        />
      </div>
    </main>
  );
}
