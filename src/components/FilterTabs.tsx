import type { TaskFilter } from '../types/task';

interface FilterTabsProps {
  filter: TaskFilter;
  onChange: (filter: TaskFilter) => void;
  stats: {
    total: number;
    active: number;
    completed: number;
  };
  theme: {
    bgColor: string;
    textColor: string;
    hintColor: string;
    buttonColor: string;
    buttonTextColor: string;
  };
  haptic: {
    selection: () => void;
  };
}

const filters: { value: TaskFilter; label: string; icon: string }[] = [
  { value: 'all', label: 'All', icon: '📋' },
  { value: 'active', label: 'Active', icon: '⚡' },
  { value: 'completed', label: 'Done', icon: '✅' },
];

export const FilterTabs = ({ filter, onChange, stats, theme, haptic }: FilterTabsProps) => {
  const getCount = (f: TaskFilter) => {
    switch (f) {
      case 'all':
        return stats.total;
      case 'active':
        return stats.active;
      case 'completed':
        return stats.completed;
    }
  };

  const handleChange = (newFilter: TaskFilter) => {
    haptic.selection();
    onChange(newFilter);
  };

  return (
    <div className="grid grid-cols-3 gap-2">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => handleChange(f.value)}
          className="py-3 px-4 rounded-xl font-medium transition-all"
          style={{
            backgroundColor: filter === f.value ? theme.buttonColor : `${theme.bgColor}80`,
            color: filter === f.value ? theme.buttonTextColor : theme.textColor,
            borderWidth: 1,
            borderColor: filter === f.value ? theme.buttonColor : `${theme.hintColor}30`,
          }}
        >
          <div className="flex flex-col items-center gap-1">
            <span className="text-lg">{f.icon}</span>
            <span className="text-xs">{f.label}</span>
            <span className="text-sm font-bold">{getCount(f.value)}</span>
          </div>
        </button>
      ))}
    </div>
  );
};
