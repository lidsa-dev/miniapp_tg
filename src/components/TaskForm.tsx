import { useState } from 'react';
import type { Task, TaskPriority } from '../types/task';

interface TaskFormProps {
  onSubmit: (title: string, description?: string, priority?: TaskPriority, dueDate?: string) => void;
  onUpdate?: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
  onCancel: () => void;
  editTask?: Task;
  theme: {
    bgColor: string;
    textColor: string;
    hintColor: string;
    linkColor: string;
    buttonColor: string;
    buttonTextColor: string;
  };
}

export const TaskForm = ({ onSubmit, onUpdate, onCancel, editTask, theme }: TaskFormProps) => {
  const [title, setTitle] = useState(editTask?.title || '');
  const [description, setDescription] = useState(editTask?.description || '');
  const [priority, setPriority] = useState<TaskPriority>(editTask?.priority || 'medium');
  const [dueDate, setDueDate] = useState(editTask?.dueDate || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editTask && onUpdate) {
      onUpdate(editTask.id, {
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
        dueDate: dueDate || undefined,
      });
    } else {
      onSubmit(
        title.trim(),
        description.trim() || undefined,
        priority,
        dueDate || undefined
      );
    }

    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
    onCancel();
  };

  return (
    <div
      className="rounded-2xl p-6 border shadow-xl"
      style={{
        backgroundColor: `${theme.bgColor}dd`,
        borderColor: `${theme.linkColor}50`,
      }}
    >
      <h2 className="text-xl font-bold mb-4" style={{ color: theme.textColor }}>
        {editTask ? '✏️ Edit Task' : '➕ New Task'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: theme.textColor }}>
            Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title..."
            className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all"
            style={{
              backgroundColor: `${theme.bgColor}80`,
              borderColor: `${theme.hintColor}30`,
              color: theme.textColor,
            }}
            autoFocus
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: theme.textColor }}>
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all resize-none"
            style={{
              backgroundColor: `${theme.bgColor}80`,
              borderColor: `${theme.hintColor}30`,
              color: theme.textColor,
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: theme.textColor }}>
            Priority
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['low', 'medium', 'high'] as TaskPriority[]).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPriority(p)}
                className="py-2 rounded-xl font-medium capitalize transition-all"
                style={{
                  backgroundColor: priority === p ? theme.buttonColor : `${theme.bgColor}80`,
                  color: priority === p ? theme.buttonTextColor : theme.textColor,
                  borderWidth: 1,
                  borderColor: priority === p ? theme.buttonColor : `${theme.hintColor}30`,
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: theme.textColor }}>
            Due Date
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all"
            style={{
              backgroundColor: `${theme.bgColor}80`,
              borderColor: `${theme.hintColor}30`,
              color: theme.textColor,
            }}
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={!title.trim()}
            className="flex-1 py-3 rounded-xl font-semibold transition-all disabled:opacity-50"
            style={{
              backgroundColor: theme.buttonColor,
              color: theme.buttonTextColor,
            }}
          >
            {editTask ? 'Update Task' : 'Add Task'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 rounded-xl font-semibold transition-all"
            style={{
              backgroundColor: `${theme.bgColor}80`,
              color: theme.textColor,
              borderWidth: 1,
              borderColor: `${theme.hintColor}30`,
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
