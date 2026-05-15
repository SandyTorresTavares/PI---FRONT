interface TaskDashboardProps {
  total: number;
  done: number;
  pending: number;
}

export default function TaskDashboard({ total, done, pending }: TaskDashboardProps) {
  return (
    <div className="w-full flex flex-col sm:flex-row gap-4 mb-8">
      <div className="flex-1 bg-white rounded-xl shadow p-4 text-center">
        <div className="text-xs text-gray-500">Total de Tarefas</div>
        <div className="text-2xl font-bold text-indigo-700">{total}</div>
      </div>
      <div className="flex-1 bg-white rounded-xl shadow p-4 text-center">
        <div className="text-xs text-gray-500">Concluídas</div>
        <div className="text-2xl font-bold text-green-600">{done}</div>
      </div>
      <div className="flex-1 bg-white rounded-xl shadow p-4 text-center">
        <div className="text-xs text-gray-500">Pendentes</div>
        <div className="text-2xl font-bold text-yellow-500">{pending}</div>
      </div>
    </div>
  );
}
