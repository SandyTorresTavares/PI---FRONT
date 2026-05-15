'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import TaskList from '../../components/TaskList';
import TaskCreateModal from '../../components/TaskCreateModal';
import TaskDashboard from '../../components/TaskDashboard';
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
  updateTaskStatus,
} from '../../actions/task';
import { getProfile } from '../../actions/auth';
import type { Task } from '../../types/task';
import type { UserProfile } from '../../types/auth';
import { HiOutlineBookOpen } from 'react-icons/hi';
import React, { useRef } from 'react';

export default function TasksPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [taskFilter, setTaskFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [editingDescription, setEditingDescription] = useState('');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const statusMsgTimeout = useRef<NodeJS.Timeout | null>(null);
  const showStatusMsg = (msg: string) => {
    setStatusMsg(msg);
    if (statusMsgTimeout.current) clearTimeout(statusMsgTimeout.current);
    statusMsgTimeout.current = setTimeout(() => setStatusMsg(null), 3000);
  };

  const userRole = useMemo(() => {
    if (!token) return null;

    try {
      const payload = token.split('.')[1];
      if (!payload) return null;

      const normalizedPayload = payload.replace(/-/g, '+').replace(/_/g, '/');
      const decodedPayload = atob(normalizedPayload);
      const parsedPayload = JSON.parse(decodedPayload) as { role?: string };

      if (parsedPayload.role === 'professor' || parsedPayload.role === 'aluno') {
        return parsedPayload.role;
      }

      return null;
    } catch {
      return null;
    }
  }, [token]);

  const loadTasks = useCallback(async (currentToken: string) => {
    let payload: Parameters<typeof getTasks>[0] = { token: currentToken };

    if (taskFilter === 'completed') {
      payload.completed = true;
    } else if (taskFilter === 'pending') {
      payload.completed = false;
    }

    const response = await getTasks(payload);

    if (!response.success) {
      setError(response.message || 'Não foi possível carregar as tarefas.');
      return;
    }

    setTasks(response.data?.tasks || []);
  }, [taskFilter]);

  useEffect(() => {
    const savedToken = localStorage.getItem('auth_token');

    if (!savedToken) {
      router.push('/');
      return;
    }

    setToken(savedToken);
    // Buscar perfil do usuário
    getProfile(savedToken).then((res) => {
      if (res.success && res.data?.user) {
        setUser(res.data.user);
      }
    });
    loadTasks(savedToken).finally(() => {
      setIsLoading(false);
    });
  }, [loadTasks, router]);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    router.push('/');
  };

  const handleCreateTask = async () => {
    if (!token) return;

    setIsSubmitting(true);
    setError('');
    setSuccessMessage('');

    const response = await createTask({ token, title, description });

    if (!response.success) {
      setError(response.message || 'Não foi possível criar a tarefa.');
      setIsSubmitting(false);
      return;
    }

    setTitle('');
    setDescription('');
    setSuccessMessage(response.message || 'Tarefa criada com sucesso.');
    setIsCreateModalOpen(false);
    await loadTasks(token);
    setIsSubmitting(false);
  };

  const startEditTask = (task: Task) => {
    setEditingTaskId(task.id);
    setEditingTitle(task.title);
    setEditingDescription(task.description);
    setError('');
    setSuccessMessage('');
  };

  const cancelEditTask = () => {
    setEditingTaskId(null);
    setEditingTitle('');
    setEditingDescription('');
  };

  const handleUpdateTask = async (taskId: number) => {
    if (!token) return;

    setIsSubmitting(true);
    setError('');
    setSuccessMessage('');

    const response = await updateTask({
      token,
      id: taskId,
      title: editingTitle,
      description: editingDescription,
    });

    if (!response.success) {
      setError(response.message || 'Não foi possível atualizar a tarefa.');
      setIsSubmitting(false);
      return;
    }

    cancelEditTask();
    setSuccessMessage(response.message || 'Tarefa atualizada com sucesso.');
    await loadTasks(token);
    setIsSubmitting(false);
  };

  const handleDeleteTask = async (taskId: number) => {
    if (!token) return;

    setIsSubmitting(true);
    setError('');
    setSuccessMessage('');

    const response = await deleteTask({ token, id: taskId });

    if (!response.success) {
      setError(response.message || 'Não foi possível excluir a tarefa.');
      setIsSubmitting(false);
      return;
    }

    setSuccessMessage(response.message || 'Tarefa excluída com sucesso.');
    await loadTasks(token);
    setIsSubmitting(false);
  };

  const handleToggleTaskStatus = async (task: Task, checked: boolean) => {
    if (!token) return;

    setIsSubmitting(true);
    setError('');
    setSuccessMessage('');

    const response = await updateTaskStatus({
      token,
      id: task.id,
      completed: checked,
    });

    if (!response.success) {
      setError(response.message || 'Não foi possível atualizar o status da tarefa.');
      setIsSubmitting(false);
      showStatusMsg(response.message || 'Não foi possível atualizar o status da tarefa.');
      return;
    }

    setSuccessMessage(response.message || 'Status da tarefa atualizado.');
    showStatusMsg(response.message || 'Status da tarefa atualizado.');
    await loadTasks(token);
    setIsSubmitting(false);
  };

  // Cálculo dos totais para o dashboard
  const totalTasks = tasks.length;
  const doneTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = tasks.filter(t => !t.completed).length;

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-3xl" style={{ color: '#2563eb' }}>
                <HiOutlineBookOpen />
              </span>
              <h1 className="text-2xl font-bold" style={{ color: '#2563eb' }}>
                Projeto Integrador
              </h1>
            </div>
            <div className="space-x-4">
              <button
                type="button"
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-150 cursor-pointer"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
        {/* Detalhe azul no topo */}
        <div className="absolute left-0 right-0 h-1 bg-blue-600 top-0 rounded-t-xl" style={{ opacity: 0.15 }} />
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-gray-900">Minhas Tarefas</h2>
          {userRole && (
            <span className="text-sm font-semibold" style={{ color: '#2563eb' }}>
              Perfil: <strong>{userRole}</strong>
            </span>
          )}
        </div>
        {/* Saudação para todos os perfis */}
        {user && (
          <div className="text-xl font-semibold text-gray-800 mb-6">Olá, {user.name || user.email}!</div>
        )}
        {/* Dashboard e barra de progresso só para aluno */}
        {userRole === 'aluno' && (
          <>
            <TaskDashboard total={totalTasks} done={doneTasks} pending={pendingTasks} />
            {totalTasks > 0 && (
              <div className="w-full mb-8">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Progresso</span>
                  <span>{Math.round((doneTasks / totalTasks) * 100)}%</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 transition-all duration-300"
                    style={{ width: `${(doneTasks / totalTasks) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </>
        )}

        {userRole === 'aluno' && (
          <div className="mb-6 flex gap-2">
            <button
              type="button"
              onClick={() => setTaskFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                taskFilter === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Todas
            </button>
            <button
              type="button"
              onClick={() => setTaskFilter('pending')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                taskFilter === 'pending'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Pendentes
            </button>
            <button
              type="button"
              onClick={() => setTaskFilter('completed')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                taskFilter === 'completed'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Concluídas
            </button>
          </div>
        )}


        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            {error}
          </div>
        )}

        {userRole === 'professor' && (
          <>
            <div className="mb-8 flex justify-end">
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(true)}
                className="rounded-lg bg-indigo-600 px-6 py-2 font-medium text-white transition hover:bg-indigo-700 cursor-pointer"
              >
                + Nova Tarefa
              </button>
            </div>
            <TaskCreateModal
              isOpen={isCreateModalOpen}
              title={title}
              description={description}
              isSubmitting={isSubmitting}
              onClose={() => {
                setIsCreateModalOpen(false);
                setTitle('');
                setDescription('');
              }}
              onChangeTitle={setTitle}
              onChangeDescription={setDescription}
              onCreate={handleCreateTask}
            />
          </>
        )}

        {isLoading ? (
          <div className="rounded-lg bg-white p-12 text-center shadow">
            <p className="text-lg text-gray-600">Carregando tarefas...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-600 text-lg">Nenhuma tarefa criada ainda.</p>
          </div>
        ) : (
          <TaskList
            tasks={tasks}
            userRole={userRole}
            editingTaskId={editingTaskId}
            editingTitle={editingTitle}
            editingDescription={editingDescription}
            isSubmitting={isSubmitting}
            onEdit={startEditTask}
            onCancelEdit={cancelEditTask}
            onChangeEditTitle={setEditingTitle}
            onChangeEditDescription={setEditingDescription}
            onSaveEdit={handleUpdateTask}
            onDelete={handleDeleteTask}
            onToggleStatus={handleToggleTaskStatus}
            showStatusMsg={showStatusMsg}
            statusMsg={statusMsg}
          />
        )}
      </div>
      <footer className="w-full mt-16 py-6 bg-gradient-to-r from-blue-50 via-white to-blue-50 border-t border-blue-100">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-gray-500">
          Projeto Integrador UNIVESP &copy; {new Date().getFullYear()}<br />
          Sistema acadêmico desenvolvido para fins educacionais — Universidade Virtual do Estado de São Paulo
        </div>
      </footer>
    </main>
  );
}
