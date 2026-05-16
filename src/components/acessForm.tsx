import { useRouter } from 'next/navigation';
interface AcessFormProps {
  profile: 'estudante' | 'professor';
  setProfile: (profile: 'estudante' | 'professor') => void;
  showProfileSelector?: boolean;
  isLoading?: boolean;
  register: any;
  errors: any;
  onSubmit: (data: any) => void;
  handleSubmit: (fn: (data: any) => void) => (e: React.FormEvent<HTMLFormElement>) => void;
  children?: React.ReactNode;
  buttonLabel?: string;
  error?: string;
  title?: string;
  subtitle?: string;
  isLogin?: boolean;
  footer?: React.ReactNode;
}

export default function AcessForm({
  profile,
  setProfile,
  showProfileSelector = false,
  isLoading = false,
  register,
  errors,
  onSubmit,
  handleSubmit,
  buttonLabel = 'Enviar',
  children,
  error,
  title = 'Bem-vindo de volta!',
  subtitle = 'Acesse sua conta institucional para continuar',
  isLogin = true,
  footer,
}: AcessFormProps) {
  const router = useRouter();
  return (
    <div className="w-full max-w-md mx-auto border border-gray-200 shadow-2xl rounded-2xl bg-white p-8">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-500 text-base">{subtitle}</p>
      </div>
      {showProfileSelector && (
        <div className="flex mb-6 rounded-lg overflow-hidden border border-gray-200">
          <button
            type="button"
            className={`flex-1 py-2 text-center font-medium transition focus:outline-none cursor-pointer
              ${profile === 'estudante' ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-500 hover:bg-blue-50 hover:text-blue-700'}`}
            onClick={() => setProfile('estudante')}
            style={{ transition: 'background 0.2s, color 0.2s' }}
          >
            <span className="mr-2">👨‍🎓</span> Estudante
          </button>
          <button
            type="button"
            className={`flex-1 py-2 text-center font-medium transition focus:outline-none cursor-pointer
              ${profile === 'professor' ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-500 hover:bg-blue-50 hover:text-blue-700'}`}
            onClick={() => setProfile('professor')}
            style={{ transition: 'background 0.2s, color 0.2s' }}
          >
            <span className="mr-2">👩‍🏫</span> Professor
          </button>
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-center">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {!isLogin && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nome Completo
            </label>
            <input
              {...register('name')}
              type="text"
              placeholder="João Silva"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
            />
            {errors.name && (
              <span className="text-sm text-red-600 mt-1">{errors.name.message}</span>
            )}
          </div>
        )}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            E-mail institucional
          </label>
          <input
            {...register('email')}
            type="email"
            placeholder={profile === 'estudante' ? 'aluno@formateur.edu.br' : 'professor@formateur.edu.br'}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
          />
          {errors.email && (
            <span className="text-sm text-red-600 mt-1">{errors.email.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Senha
          </label>
          <input
            {...register('password')}
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
          />
          {errors.password && (
            <span className="text-sm text-red-600 mt-1">{errors.password.message}</span>
          )}
        </div>
        {children}
        <button
          type="submit"
          disabled={isLoading}
          className={
            `w-full bg-indigo-600 text-white py-2 rounded-lg font-medium transition-all duration-200
            hover:bg-indigo-700 focus:bg-indigo-700
            disabled:opacity-50 disabled:cursor-not-allowed
            ${!isLoading ? 'cursor-pointer' : 'cursor-wait'}`
          }
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              Carregando...
            </span>
          ) : buttonLabel}
        </button>
      </form>
      {footer !== undefined ? (
        <div className="mt-8 text-center text-xs text-gray-400">{footer}</div>
      ) : (
        <>
          {isLogin ? (
            <>
              <p className="text-center text-gray-600 mt-6">
                Não tem conta?{' '}
                <button
                  type="button"
                  className="text-indigo-600 font-medium hover:text-indigo-700 underline bg-transparent border-none p-0 m-0 cursor-pointer"
                  onClick={() => router.push('/register')}
                >
                  Registre-se
                </button>
              </p>
              <p className="text-xs text-gray-400 text-center mt-4 mb-2">Desenvolvido com metodologia Design Thinking · UNIVESP</p>
            </>
          ) : (
            <>
              <p className="text-center text-gray-600 mt-6">
                Já tem conta?{' '}
                <button
                  type="button"
                  className="text-indigo-600 font-medium hover:text-indigo-700 underline bg-transparent border-none p-0 m-0 cursor-pointer"
                  onClick={() => router.push('/')}
                >
                  Faça login
                </button>
              </p>
              <p className="text-xs text-gray-400 text-center mt-4 mb-2">Desenvolvido com metodologia Design Thinking · UNIVESP</p>
            </>
          )}
        </>
      )}
    </div>
  );
}