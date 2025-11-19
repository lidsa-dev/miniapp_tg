import { useState, useEffect } from 'react';
import { useTelegram } from './hooks/useTelegram';
import { useTasks } from './hooks/useTasks';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import { FilterTabs } from './components/FilterTabs';
import { Stats } from './components/Stats';
import type { Task } from './types/task';

function App() {
  const { user, theme, haptic, tg, sendData } = useTelegram();
  const { tasks, filter, setFilter, addTask, updateTask, deleteTask, toggleTask, stats, allTasks } = useTasks();
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();

  const bgColor = theme?.bg_color || '#0a0a0a';
  const textColor = theme?.text_color || '#ffffff';
  const buttonColor = theme?.button_color || '#3b82f6';
  const linkColor = theme?.link_color || '#06b6d4';
  const hintColor = theme?.hint_color || '#6b7280';
  const buttonTextColor = theme?.button_text_color || '#ffffff';

  const themeColors = {
    bgColor,
    textColor,
    hintColor,
    linkColor,
    buttonColor,
    buttonTextColor,
  };

  useEffect(() => {
    const mainButton = tg?.MainButton;
    const backButton = tg?.BackButton;

    if (showForm || editingTask) {
      backButton?.show();
      mainButton?.hide();

      const handleBack = () => {
        haptic.impact('light');
        setShowForm(false);
        setEditingTask(undefined);
      };

      backButton?.onClick(handleBack);

      return () => {
        backButton?.offClick(handleBack);
      };
    } else {
      backButton?.hide();
      mainButton?.setParams({
        text: '➕ New Task',
        color: buttonColor,
        text_color: buttonTextColor,
        is_active: true,
        is_visible: true,
      });
      mainButton?.show();

      const handleMainButton = () => {
        haptic.impact('medium');
        setShowForm(true);
      };

      mainButton?.onClick(handleMainButton);

      return () => {
        mainButton?.offClick(handleMainButton);
      };
    }
  }, [showForm, editingTask, buttonColor, buttonTextColor, tg, haptic]);

  useEffect(() => {
    if (stats.total > 0) {
      sendData({
        action: 'tasks_updated',
        stats,
        tasks: allTasks,
      });
    }
  }, [stats, allTasks, sendData]);

  const handleAddTask = (title: string, description?: string, priority?: 'low' | 'medium' | 'high', dueDate?: string) => {
    haptic.notification('success');
    addTask(title, description, priority, dueDate);
  };

  const handleUpdateTask = (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    haptic.notification('success');
    updateTask(id, updates);
  };

  const handleDeleteTask = (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      haptic.notification('warning');
      deleteTask(id);
    }
  };

  const handleToggleTask = (id: string) => {
    const task = allTasks.find(t => t.id === id);
    if (task) {
      haptic.notification(task.status === 'active' ? 'success' : 'warning');
      toggleTask(id);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  return (
    <div
      style={{ backgroundColor: bgColor, color: textColor, minHeight: '100vh' }}
      className="pb-20"
    >
      <div className="max-w-2xl mx-auto p-4 space-y-4">
        <div
          className="rounded-2xl p-6 border backdrop-blur-sm"
          style={{
            backgroundColor: `${bgColor}cc`,
            borderColor: `${linkColor}50`,
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold" style={{ color: textColor }}>
              ✅ Task Tracker
            </h1>
            {user?.is_premium && (
              <div
                className="px-3 py-1 rounded-full text-xs font-bold tracking-wide"
                style={{ backgroundColor: buttonColor, color: buttonTextColor }}
              >
                ⭐ PREMIUM
              </div>
            )}
          </div>
          <p className="text-sm" style={{ color: hintColor }}>
            Welcome, {user?.first_name || 'User'}! 👋
          </p>
        </div>

        {showForm || editingTask ? (
          <TaskForm
            key={editingTask?.id || 'new'}
            onSubmit={handleAddTask}
            onUpdate={handleUpdateTask}
            onCancel={() => {
              setShowForm(false);
              setEditingTask(undefined);
            }}
            editTask={editingTask}
            theme={themeColors}
          />
        ) : (
          <>
            <Stats stats={stats} theme={themeColors} />

            <FilterTabs
              filter={filter}
              onChange={setFilter}
              stats={stats}
              theme={themeColors}
              haptic={haptic}
            />

            <TaskList
              tasks={tasks}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
              theme={themeColors}
              haptic={haptic}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
