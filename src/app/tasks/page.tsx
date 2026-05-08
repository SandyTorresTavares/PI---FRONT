'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-indigo-600">PI Tasks</h1>
            <div className="space-x-4">
              <Link
                href="/logout"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Sair
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Minhas Tarefas</h2>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 font-medium">
            + Nova Tarefa
          </button>
        </div>

        {tasks.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-600 text-lg">Nenhuma tarefa criada ainda.</p>
            <button className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 font-medium">
              Criar Primeira Tarefa
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {/* Tasks will be mapped here */}
          </div>
        )}
      </div>
    </main>
  );
}
