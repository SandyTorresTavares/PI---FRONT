'use client';

import { useState } from 'react';
import SideInfoPanel from '../../components/SideInfoPanel';
import AuthForm from '../../components/acessForm';
import { register as registerUser } from '../../actions/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<'estudante' | 'professor'>('estudante');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError('');
    try {
      const submitData = data;
      const role = profile === 'estudante' ? 'aluno' : 'professor';
      const response = await registerUser({ ...submitData, role });
      if (response.success) {
        router.push('/');
      } else {
        setError(response.message || 'Erro ao criar conta.');
      }
    } catch (err) {
      setError('Erro ao criar conta. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full flex bg-blue-700">
      <SideInfoPanel />
      <div className="flex flex-col justify-center w-full md:w-1/2 bg-white p-6 sm:p-8 md:p-16 min-w-[320px] min-h-screen rounded-l-3xl">
        <AuthForm
          profile={profile}
          setProfile={setProfile}
          showProfileSelector={true}
          isLoading={isLoading}
          register={register}
          errors={errors}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          buttonLabel={isLoading ? 'Criando conta...' : 'Criar Conta'}
          error={error}
          title="Crie sua conta"
          subtitle="Preencha os dados para se cadastrar"
          isLogin={false}
        />
      </div>
    </main>
  );
}
