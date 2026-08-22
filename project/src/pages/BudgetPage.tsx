import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Share2, Sparkles, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { BudgetDonut, BudgetLegend, DailySpendingBars } from '@/components/travel/BudgetChart';
import { ShareModal } from '@/components/travel/ShareModal';
import { useTrips } from '@/context/TripsContext';
import { upcomingTrip } from '@/data/destinations';
import { planTotal } from '@/data/ai';
import { useState } from 'react';

export function BudgetPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTrip } = useTrips();
  const [shareOpen, setShareOpen] = useState(false);

  const trip = (id && getTrip(id)) || upcomingTrip;
  const total = planTotal(trip);
  const remaining = trip.budget - total;
  const withinBudget = remaining >= 0;

  const expenses = [
    { icon: '🏨', label: 'Accommodation', value: trip.budgetBreakdown.accommodation, color: 'bg-brand-50 text-brand-700' },
    { icon: '🚕', label: 'Transportation', value: trip.budgetBreakdown.transportation, color: 'bg-accent-50 text-accent-700' },
    { icon: '🍽️', label: 'Food', value: trip.budgetBreakdown.food, color: 'bg-violet-50 text-violet-700' },
    { icon: '🎟️', label: 'Activities', value: trip.budgetBreakdown.activities, color: 'bg-amber-50 text-amber-700' },
  ];

  const daily = trip.itinerary.map((d) => d.items.reduce((s, i) => s + i.cost, 0));
  // Ensure 4 days for the spec'd daily breakdown
  const dailyData = daily.length >= 4 ? daily.slice(0, 4) : [13500, 12800, 18000, 13500];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 flex-wrap animate-fade-up">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(`/trips/${trip.id}`)} className="p-2 -ml-2 rounded-xl text-ink-500 hover:bg-ink-100 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-display font-bold text-ink-900">Trip Budget</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate(`/trips/${trip.id}/itinerary`)}>
            Itinerary
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShareOpen(true)}>
            <Share2 size={15} /> Share
          </Button>
          <Button variant="primary" size="sm" onClick={() => navigate('/ai')}>
            <Sparkles size={15} /> Ask GlobeGuide
          </Button>
        </div>
      </div>

      {/* Total */}
      <Card className="p-6 sm:p-8 animate-fade-up" style={{ animationDelay: '60ms' }}>
        <p className="text-sm text-ink-400 font-medium mb-1">Estimated total</p>
        <div className="flex items-baseline gap-3 mb-4">
          <span className="text-4xl sm:text-5xl font-display font-bold text-ink-900 tracking-tight">
            ₹{total.toLocaleString('en-IN')}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-ink-100">
            <Wallet size={14} className="text-ink-500" />
            <span className="text-sm font-semibold text-ink-600">Budget ₹{trip.budget.toLocaleString('en-IN')}</span>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${withinBudget ? 'bg-green-50' : 'bg-rose-50'}`}>
            <span className={`w-2 h-2 rounded-full ${withinBudget ? 'bg-green-500' : 'bg-rose-500'}`} />
            <span className={`text-sm font-bold ${withinBudget ? 'text-green-700' : 'text-rose-700'}`}>
              {withinBudget ? '₹' : '-₹'}{Math.abs(remaining).toLocaleString('en-IN')} remaining
            </span>
          </div>
        </div>
      </Card>

      {/* Expense cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 animate-fade-up" style={{ animationDelay: '120ms' }}>
        {expenses.map((e) => (
          <Card key={e.label} className="p-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3 ${e.color}`}>
              {e.icon}
            </div>
            <p className="text-xs text-ink-400 font-medium">{e.label}</p>
            <p className="text-xl font-bold text-ink-900">₹{e.value.toLocaleString('en-IN')}</p>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-5 animate-fade-up" style={{ animationDelay: '180ms' }}>
        <Card className="p-5 sm:p-6">
          <h3 className="font-bold text-ink-900 mb-4">Budget breakdown</h3>
          <BudgetDonut breakdown={trip.budgetBreakdown} total={total} />
          <div className="mt-4 pt-4 border-t border-ink-100">
            <BudgetLegend breakdown={trip.budgetBreakdown} />
          </div>
        </Card>
        <Card className="p-5 sm:p-6">
          <h3 className="font-bold text-ink-900 mb-4">Daily spending</h3>
          <DailySpendingBars daily={dailyData} />
        </Card>
      </div>

      <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} trip={trip} />
    </div>
  );
}
