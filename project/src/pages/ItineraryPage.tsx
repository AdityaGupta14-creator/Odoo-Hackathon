import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Wallet, Share2, Sparkles, Plus, Trash2, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { ItineraryTimeline } from '@/components/travel/ItineraryTimeline';
import { ShareModal } from '@/components/travel/ShareModal';
import { useTrips } from '@/context/TripsContext';
import { useToast } from '@/context/ToastContext';
import { upcomingTrip } from '@/data/destinations';
import type { ItineraryDay, ItineraryItem } from '@/types';

const categories = ['Food', 'Landmark', 'Culture', 'Sightseeing', 'Shopping', 'Adventure', 'Relaxation', 'Beach'];

export function ItineraryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTrip, updateTrip } = useTrips();
  const { showToast } = useToast();
  const [shareOpen, setShareOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDay, setEditingDay] = useState<ItineraryDay | null>(null);
  const [editingItem, setEditingItem] = useState<ItineraryItem | null>(null);

  const trip = (id && getTrip(id)) || upcomingTrip;

  const [form, setForm] = useState({ activity: '', time: '', category: 'Sightseeing', cost: '' });

  const openAdd = (day: ItineraryDay) => {
    setEditingDay(day);
    setEditingItem(null);
    setForm({ activity: '', time: '', category: 'Sightseeing', cost: '' });
    setModalOpen(true);
  };

  const openEdit = (day: ItineraryDay, item: ItineraryItem) => {
    setEditingDay(day);
    setEditingItem(item);
    setForm({ activity: item.activity, time: item.time, category: item.category, cost: String(item.cost) });
    setModalOpen(true);
  };

  const save = () => {
    if (!editingDay || !form.activity.trim() || !form.time.trim()) {
      showToast('Please fill in activity name and time', '⚠️');
      return;
    }
    const newItinerary = trip.itinerary.map((d) => {
      if (d.day !== editingDay.day) return d;
      if (editingItem) {
        return {
          ...d,
          items: d.items.map((it) =>
            it.id === editingItem.id
              ? { ...it, activity: form.activity, time: form.time, category: form.category, cost: Number(form.cost) || 0, duration: it.duration }
              : it,
          ),
        };
      }
      return {
        ...d,
        items: [
          ...d.items,
          { id: `new-${Date.now()}`, activity: form.activity, time: form.time, category: form.category, duration: '1-2 hrs', cost: Number(form.cost) || 0 },
        ],
      };
    });
    updateTrip(trip.id, { itinerary: newItinerary });
    setModalOpen(false);
    showToast(editingItem ? 'Activity updated' : 'Activity added', '✅');
  };

  const deleteItem = (day: ItineraryDay, item: ItineraryItem) => {
    const newItinerary = trip.itinerary.map((d) =>
      d.day === day.day ? { ...d, items: d.items.filter((it) => it.id !== item.id) } : d,
    );
    updateTrip(trip.id, { itinerary: newItinerary });
    showToast('Activity removed', '🗑️');
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 flex-wrap animate-fade-up">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/trips/${trip.id}`)}
            className="p-2 -ml-2 rounded-xl text-ink-500 hover:bg-ink-100 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-display font-bold text-ink-900">{trip.name}</h1>
            <p className="text-sm text-ink-400">{trip.startDate} — {trip.endDate}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate(`/trips/${trip.id}/budget`)}>
            <Wallet size={15} /> Budget
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShareOpen(true)}>
            <Share2 size={15} /> Share
          </Button>
          <Button variant="primary" size="sm" onClick={() => navigate('/ai')}>
            <Sparkles size={15} /> Ask GlobeGuide
          </Button>
        </div>
      </div>

      {/* Itinerary */}
      <Card className="p-5 sm:p-6 animate-fade-up" style={{ animationDelay: '60ms' }}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-ink-900">Day-by-day itinerary</h2>
          <Button size="sm" variant="primary" onClick={() => openAdd(trip.itinerary[0])}>
            <Plus size={15} /> Add Activity
          </Button>
        </div>
        <ItineraryTimeline
          days={trip.itinerary}
          editable
          onEditItem={openEdit}
          onDeleteItem={deleteItem}
          onAddActivity={openAdd}
        />
      </Card>

      {/* Add/Edit Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editingItem ? 'Edit Activity' : 'Add Activity'}>
        <div className="space-y-4">
          <Field label="Activity name">
            <input
              value={form.activity}
              onChange={(e) => setForm({ ...form, activity: e.target.value })}
              placeholder="e.g. Visit the museum"
              className="w-full h-11 px-4 rounded-xl bg-ink-50 border border-ink-200 focus:border-brand-400 focus:bg-white focus:outline-none text-sm font-medium text-ink-900 transition-all"
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Time">
              <input
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                placeholder="e.g. 14:00"
                className="w-full h-11 px-4 rounded-xl bg-ink-50 border border-ink-200 focus:border-brand-400 focus:bg-white focus:outline-none text-sm font-medium text-ink-900 transition-all"
              />
            </Field>
            <Field label="Cost (₹)">
              <input
                value={form.cost}
                onChange={(e) => setForm({ ...form, cost: e.target.value })}
                placeholder="0"
                type="number"
                className="w-full h-11 px-4 rounded-xl bg-ink-50 border border-ink-200 focus:border-brand-400 focus:bg-white focus:outline-none text-sm font-medium text-ink-900 transition-all"
              />
            </Field>
          </div>
          <Field label="Category">
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setForm({ ...form, category: c })}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold border transition-all ${
                    form.category === c
                      ? 'bg-brand-600 text-white border-brand-600'
                      : 'bg-white text-ink-600 border-ink-200 hover:border-ink-300'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </Field>
          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={() => setModalOpen(false)} className="flex-1">Cancel</Button>
            <Button variant="primary" onClick={save} className="flex-1">
              {editingItem ? <><Pencil size={16} /> Save</> : <><Plus size={16} /> Add</>}
            </Button>
          </div>
        </div>
      </Modal>

      <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} trip={trip} />
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-semibold text-ink-500 uppercase tracking-wider mb-2 block">{label}</label>
      {children}
    </div>
  );
}
