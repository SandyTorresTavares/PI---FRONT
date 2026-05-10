import React from 'react';

interface TaskCreateModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  isSubmitting: boolean;
  onClose: () => void;
  onChangeTitle: (value: string) => void;
  onChangeDescription: (value: string) => void;
  onCreate: () => void;
}

const TaskCreateModal: React.FC<TaskCreateModalProps> = ({
  isOpen,
  title,
  description,
  isSubmitting,
  onClose,
  onChangeTitle,
  onChangeDescription,
  onCreate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md border border-gray-300">
        <h2 className="text-xl font-bold mb-4">Criar Nova Tarefa</h2>
        <div className="grid gap-3">
          <input
            value={title}
            onChange={(e) => onChangeTitle(e.target.value)}
            type="text"
            placeholder="Título da tarefa"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-transparent focus:ring-2 focus:ring-indigo-500"
          />
          <textarea
            value={description}
            onChange={(e) => onChangeDescription(e.target.value)}
            placeholder="Descrição da tarefa"
            rows={3}
            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-transparent focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={onCreate}
              disabled={isSubmitting}
              className="rounded-lg bg-indigo-600 px-6 py-2 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? 'Salvando...' : 'Criar Tarefa'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCreateModal;
