import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, LabelList } from 'recharts';
import type { BudgetBreakdown } from '@/types';

const COLORS = ['#059669', '#f97316', '#6366f1', '#f59e0b'];

export function BudgetDonut({ breakdown, total }: { breakdown: BudgetBreakdown; total: number }) {
  const data = [
    { name: 'Accommodation', value: breakdown.accommodation },
    { name: 'Transportation', value: breakdown.transportation },
    { name: 'Food', value: breakdown.food },
    { name: 'Activities', value: breakdown.activities },
  ];

  return (
    <div className="relative w-full h-56">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={62}
            outerRadius={90}
            paddingAngle={3}
            stroke="none"
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-xs font-medium text-ink-400">Total</span>
        <span className="text-2xl font-bold text-ink-900">₹{(total / 1000).toFixed(1)}K</span>
      </div>
    </div>
  );
}

export function BudgetLegend({ breakdown }: { breakdown: BudgetBreakdown }) {
  const items = [
    { name: 'Accommodation', value: breakdown.accommodation, color: COLORS[0], icon: '🏨' },
    { name: 'Transportation', value: breakdown.transportation, color: COLORS[1], icon: '🚕' },
    { name: 'Food', value: breakdown.food, color: COLORS[2], icon: '🍽️' },
    { name: 'Activities', value: breakdown.activities, color: COLORS[3], icon: '🎟️' },
  ];
  return (
    <div className="space-y-2.5">
      {items.map((item) => (
        <div key={item.name} className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: item.color }} />
          <span className="text-sm text-ink-600 flex-1">
            {item.icon} {item.name}
          </span>
          <span className="text-sm font-bold text-ink-900">₹{item.value.toLocaleString('en-IN')}</span>
        </div>
      ))}
    </div>
  );
}

export function DailySpendingBars({ daily }: { daily: number[] }) {
  const data = daily.map((v, i) => ({ day: `Day ${i + 1}`, value: v }));
  return (
    <div className="w-full h-48">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
          <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#647089' }} axisLine={false} tickLine={false} />
          <Tooltip
            cursor={{ fill: 'rgba(17,22,42,0.04)' }}
            formatter={(v) => [`₹${Number(v).toLocaleString('en-IN')}`, 'Spending']}
            contentStyle={{
              borderRadius: 12,
              border: '1px solid #eceef2',
              boxShadow: '0 8px 30px rgba(17,22,42,0.12)',
              fontSize: 13,
            }}
          />
          <Bar dataKey="value" fill="#059669" radius={[8, 8, 4, 4]} maxBarSize={56}>
            <LabelList
              dataKey="value"
              position="top"
              formatter={(v) => `₹${(Number(v) / 1000).toFixed(1)}K`}
              style={{ fontSize: 11, fontWeight: 600, fill: '#647089' }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
