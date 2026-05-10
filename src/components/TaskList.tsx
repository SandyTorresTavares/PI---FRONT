import React from 'react';
import type { Task } from '../types/task';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  userRole: 'professor' | 'aluno' | null;
  editingTaskId: number | null;
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
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  userRole,
  editingTaskId,
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
}) => {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          userRole={userRole}
          isEditing={editingTaskId === task.id}
          editingTitle={editingTitle}
          editingDescription={editingDescription}
          isSubmitting={isSubmitting}
          onEdit={onEdit}
          onCancelEdit={onCancelEdit}
          onChangeEditTitle={onChangeEditTitle}
          onChangeEditDescription={onChangeEditDescription}
          onSaveEdit={onSaveEdit}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </div>
  );
};

export default TaskList;
