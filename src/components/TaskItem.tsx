import type { Task } from '../types/task';
import { HiCheckCircle } from 'react-icons/hi2';

interface TaskItemProps {
  task: Task;
  userRole: 'professor' | 'aluno' | null;
  isEditing: boolean;
  editingTitle: string;
  editingDescription: string;
  isSubmitting: boolean;
  onEdit: (task: Task) => void;
  onCancelEdit: () => void;
  onChangeEditTitle: (value: string) => void;
  onChangeEditDescription: (value: string) => void;
  onSaveEdit: (taskId: number) => void;
  onDelete: (taskId: number) => void;
  onToggleStatus: (task: Task, checked: boolean) => void;
  showStatusMsg?: (msg: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  userRole,
  isEditing,
  editingTitle,
  editingDescription,
  isSubmitting,
  onEdit,
  onCancelEdit,
  onChangeEditTitle,
  onChangeEditDescription,
  onSaveEdit,
  onDelete,
  onToggleStatus,
  showStatusMsg,
}) => {
  const isCompleted = task.completed === true || task.completed === 1;

  const handleToggle = (checked: boolean) => {
    onToggleStatus(task, checked);
  };

  if (isEditing) {
    return (
      <div className="grid gap-3">
        <input
          value={editingTitle}
          onChange={(e) => onChangeEditTitle(e.target.value)}
          type="text"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-transparent focus:ring-2 focus:ring-indigo-500"
        />
        <textarea
          value={editingDescription}
          onChange={(e) => onChangeEditDescription(e.target.value)}
          rows={3}
          className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-transparent focus:ring-2 focus:ring-indigo-500"
        />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onSaveEdit(task.id)}
            disabled={isSubmitting}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Salvar
          </button>
          <button
            type="button"
            onClick={onCancelEdit}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white p-5 shadow max-w-sm w-full mx-auto relative">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">{task.title}</h3>
        {userRole === 'aluno' && (
          <button
            type="button"
            onClick={() => handleToggle(!isCompleted)}
            className={`w-8 h-8 flex items-center justify-center rounded-full border-2 transition-all duration-200
              ${isCompleted ? 'bg-green-100 border-green-500' : 'bg-white border-gray-300 hover:border-blue-400'}
              cursor-pointer group`}
            aria-label={isCompleted ? 'Desmarcar como concluída' : 'Marcar como concluída'}
          >
            {isCompleted ? (
              <HiCheckCircle className="text-green-500 w-6 h-6" />
            ) : (
              <HiCheckCircle className="text-gray-400 w-6 h-6 group-hover:text-blue-500" />
            )}
          </button>
        )}
      </div>
      <p className="text-gray-700">{task.description}</p>
      {userRole === 'professor' && (
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => onEdit(task)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-900 cursor-pointer"
          >
            Editar
          </button>
          <button
            type="button"
            onClick={() => onDelete(task.id)}
            disabled={isSubmitting}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 cursor-pointer disabled:opacity-50"
          >
            Excluir
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
