"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getProfile } from '../actions/auth';

export default function Home() {
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    if (!token) {
      setLoading(false);
      return;
    }
    getProfile(token).then((res) => {
      if (res.success && res.data?.user) {
        setUserName(res.data.user.name || res.data.user.email);
      }
      setLoading(false);
    });
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-indigo-600">PI Tasks</h1>
            <div className="space-x-4">
              <Link
                href="/login"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                Registrar
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {userName && !loading && (
            <h3 className="text-2xl font-semibold text-indigo-700 mb-4">Olá, {userName}</h3>
          )}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Bem-vindo ao PI Tasks
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Organize suas tarefas de forma eficiente e produtiva. Faça login ou crie uma conta para começar.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/login"
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 font-medium text-lg"
            >
              Fazer Login
            </Link>
            <Link
              href="/register"
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg border-2 border-indigo-600 hover:bg-indigo-50 font-medium text-lg"
            >
              Criar Conta
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
