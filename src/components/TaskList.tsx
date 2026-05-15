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


interface TaskListPropsWithMsg extends TaskListProps {
  showStatusMsg?: (msg: string) => void;
  statusMsg?: string | null;
}

const TaskList: React.FC<TaskListPropsWithMsg> = ({
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
  showStatusMsg,
  statusMsg,
}) => {
  return (
    <>
      {statusMsg && (
        <div style={{ position: 'fixed', left: 24, bottom: 24, zIndex: 9999, pointerEvents: 'none' }}>
          <div className="bg-blue-600 text-white px-5 py-3 rounded-xl shadow-lg text-base animate-fade-in-out pointer-events-auto">
            {statusMsg}
          </div>
        </div>
      )}
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
            showStatusMsg={showStatusMsg}
          />
        ))}
      </div>
    </>
  );
};

export default TaskList;
