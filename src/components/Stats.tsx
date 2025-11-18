interface StatsProps {
  stats: {
    total: number;
    active: number;
    completed: number;
  };
  theme: {
    bgColor: string;
    textColor: string;
    hintColor: string;
    linkColor: string;
    buttonColor: string;
  };
}

export const Stats = ({ stats, theme }: StatsProps) => {
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div
      className="rounded-2xl p-6 border"
      style={{
        backgroundColor: `${theme.bgColor}90`,
        borderColor: `${theme.linkColor}40`,
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold" style={{ color: theme.textColor }}>
          📊 Statistics
        </h2>
        <div
          className="px-3 py-1 rounded-full text-sm font-bold"
          style={{
            backgroundColor: `${theme.buttonColor}20`,
            color: theme.buttonColor,
          }}
        >
          {completionRate}% Complete
        </div>
      </div>

      <div className="w-full h-2 rounded-full mb-4" style={{ backgroundColor: `${theme.hintColor}20` }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${completionRate}%`,
            backgroundColor: theme.buttonColor,
          }}
        />
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold mb-1" style={{ color: theme.textColor }}>
            {stats.total}
          </div>
          <div className="text-xs" style={{ color: theme.hintColor }}>
            Total
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold mb-1" style={{ color: theme.linkColor }}>
            {stats.active}
          </div>
          <div className="text-xs" style={{ color: theme.hintColor }}>
            Active
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold mb-1" style={{ color: theme.buttonColor }}>
            {stats.completed}
          </div>
          <div className="text-xs" style={{ color: theme.hintColor }}>
            Completed
          </div>
        </div>
      </div>
    </div>
  );
};
