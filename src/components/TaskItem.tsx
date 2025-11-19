import type { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  theme: {
    bgColor: string;
    textColor: string;
    hintColor: string;
    linkColor: string;
    buttonColor: string;
  };
  haptic: {
    impact: (style?: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
    selection: () => void;
  };
}

const priorityColors = {
  low: '#10b981',
  medium: '#f59e0b',
  high: '#ef4444',
};

const priorityLabels = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export const TaskItem = ({ task, onToggle, onDelete, onEdit, theme, haptic }: TaskItemProps) => {
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status === 'active';

  const handleToggle = () => {
    haptic.impact('light');
    onToggle(task.id);
  };

  const handleDelete = () => {
    haptic.impact('heavy');
    onDelete(task.id);
  };

  const handleEdit = () => {
    haptic.selection();
    onEdit(task);
  };

  return (
    <div
      className="rounded-xl p-4 border transition-all duration-200 hover:scale-[1.02]"
      style={{
        backgroundColor: `${theme.bgColor}90`,
        borderColor: task.status === 'completed' ? `${theme.hintColor}30` : `${priorityColors[task.priority]}40`,
        opacity: task.status === 'completed' ? 0.7 : 1,
      }}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={handleToggle}
          className="mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200"
          style={{
            borderColor: task.status === 'completed' ? theme.buttonColor : priorityColors[task.priority],
            backgroundColor: task.status === 'completed' ? theme.buttonColor : 'transparent',
          }}
        >
          {task.status === 'completed' && (
            <svg className="w-4 h-4" fill="white" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <h3
            className="font-semibold text-base mb-1"
            style={{
              color: theme.textColor,
              textDecoration: task.status === 'completed' ? 'line-through' : 'none',
            }}
          >
            {task.title}
          </h3>

          {task.description && (
            <p
              className="text-sm mb-2 line-clamp-2"
              style={{ color: theme.hintColor }}
            >
              {task.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span
              className="px-2 py-1 rounded-full font-medium"
              style={{
                backgroundColor: `${priorityColors[task.priority]}20`,
                color: priorityColors[task.priority],
              }}
            >
              {priorityLabels[task.priority]}
            </span>

            {task.dueDate && (
              <span
                className="px-2 py-1 rounded-full"
                style={{
                  backgroundColor: isOverdue ? '#ef444420' : `${theme.buttonColor}20`,
                  color: isOverdue ? '#ef4444' : theme.buttonColor,
                }}
              >
                📅 {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          {task.status === 'active' && (
            <button
              onClick={handleEdit}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{
                backgroundColor: `${theme.buttonColor}20`,
                color: theme.buttonColor,
              }}
            >
              ✏️
            </button>
          )}
          <button
            onClick={handleDelete}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{
              backgroundColor: '#ef444420',
              color: '#ef4444',
            }}
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};
