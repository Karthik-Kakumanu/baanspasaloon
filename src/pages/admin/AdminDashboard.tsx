import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BUSINESS_SETTINGS, SERVICES as INITIAL_SERVICES } from '../../config/business';
import type { Appointment, Service } from '../../types';
import {
  CalendarDays,
  Sparkles,
  LayoutDashboard,
  Scissors,
  Users,
  Settings,
  LogOut,
  ExternalLink,
  Plus,
  Trash2,
  CheckCircle2,
  Search,
} from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'appointments' | 'services' | 'enquiries' | 'settings'>('overview');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [servicesList, setServicesList] = useState<Service[]>(INITIAL_SERVICES);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [membershipLeads, setMembershipLeads] = useState<any[]>([]);
  const [franchiseLeads, setFranchiseLeads] = useState<any[]>([]);
  
  // Editable settings
  const [contactPhone, setContactPhone] = useState(BUSINESS_SETTINGS.phone);
  const [contactEmail, setContactEmail] = useState(BUSINESS_SETTINGS.email);
  const [contactAddress, setContactAddress] = useState(BUSINESS_SETTINGS.address);
  const [savedNotice, setSavedNotice] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Load local storage
    try {
      const storedAppts: Appointment[] = JSON.parse(localStorage.getItem('baan_appointments') || '[]');
      setAppointments(storedAppts);

      const memLeads = JSON.parse(localStorage.getItem('baan_membership_enquiries') || '[]');
      setMembershipLeads(memLeads);

      const franLeads = JSON.parse(localStorage.getItem('baan_franchise_enquiries') || '[]');
      setFranchiseLeads(franLeads);
    } catch {
      // fallback
    }
  }, []);

  const updateAppointmentStatus = (id: string, newStatus: Appointment['status']) => {
    const updated = appointments.map((a) => (a.id === id ? { ...a, status: newStatus } : a));
    setAppointments(updated);
    localStorage.setItem('baan_appointments', JSON.stringify(updated));
  };

  const deleteAppointment = (id: string) => {
    const updated = appointments.filter((a) => a.id !== id);
    setAppointments(updated);
    localStorage.setItem('baan_appointments', JSON.stringify(updated));
  };

  const handleAddSampleService = () => {
    const newService: Service = {
      slug: `custom-ritual-${Date.now()}`,
      title: 'Botanical Silk Scalp & Shoulder Massage',
      category: 'Quick Serenity Revive',
      duration: '45 min',
      price: '₹2,200',
      numericPrice: 2200,
      description: 'A soothing custom scalp massage utilizing warm virgin coconut oil and lavender mist.',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
      includes: ['Scalp pressure points', 'Aromatic steam towels', 'Shoulder knot release'],
      popular: false,
    };
    setServicesList([newService, ...servicesList]);
  };

  const handleDeleteService = (slug: string) => {
    setServicesList(servicesList.filter((s) => s.slug !== slug));
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const filteredAppointments = appointments.filter((a) => {
    const matchesSearch =
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.phone.includes(searchTerm) ||
      (a.serviceName && a.serviceName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = appointments.filter((a) => a.status === 'Pending').length;
  const approvedCount = appointments.filter((a) => a.status === 'Approved').length;

  return (
    <div className="min-h-screen bg-[#F0F3F1] flex flex-col md:flex-row text-[#2C3830]">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#1B3B36] text-white p-6 flex flex-col justify-between flex-shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <img
              src={BUSINESS_SETTINGS.logo}
              alt=""
              className="h-10 w-auto brightness-0 invert object-contain"
            />
            <div>
              <p className="font-serif font-bold text-lg leading-tight">BAAN</p>
              <p className="text-[10px] text-[#A6BFB9] uppercase tracking-wider">Admin Workspace</p>
            </div>
          </div>

          <div className="h-px bg-white/10" />

          <nav className="space-y-1 text-sm font-medium">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors text-left cursor-pointer ${
                activeTab === 'overview' ? 'bg-white/15 text-white font-semibold' : 'text-[#A6BFB9] hover:bg-white/5 hover:text-white'
              }`}
            >
              <LayoutDashboard size={18} />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('appointments')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors text-left cursor-pointer ${
                activeTab === 'appointments' ? 'bg-white/15 text-white font-semibold' : 'text-[#A6BFB9] hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <CalendarDays size={18} />
                <span>Appointments</span>
              </div>
              {pendingCount > 0 && (
                <span className="bg-[#D4A95B] text-[#1B3B36] text-[11px] font-bold px-2 py-0.5 rounded-full">
                  {pendingCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors text-left cursor-pointer ${
                activeTab === 'services' ? 'bg-white/15 text-white font-semibold' : 'text-[#A6BFB9] hover:bg-white/5 hover:text-white'
              }`}
            >
              <Scissors size={18} />
              <span>Services Menu</span>
            </button>

            <button
              onClick={() => setActiveTab('enquiries')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors text-left cursor-pointer ${
                activeTab === 'enquiries' ? 'bg-white/15 text-white font-semibold' : 'text-[#A6BFB9] hover:bg-white/5 hover:text-white'
              }`}
            >
              <Users size={18} />
              <span>Leads &amp; Enquiries</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors text-left cursor-pointer ${
                activeTab === 'settings' ? 'bg-white/15 text-white font-semibold' : 'text-[#A6BFB9] hover:bg-white/5 hover:text-white'
              }`}
            >
              <Settings size={18} />
              <span>BAAN Settings</span>
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-white/10 space-y-3">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs text-[#A6BFB9] hover:text-white transition-colors"
          >
            <ExternalLink size={14} />
            <span>View Public Website</span>
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem('baan_admin_auth');
              onLogout();
              navigate('/admin/login');
            }}
            className="flex items-center gap-2 text-xs text-red-300 hover:text-red-200 transition-colors w-full cursor-pointer"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-gray-200">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#5C6E64] font-semibold">
              BAAN Management Desk
            </span>
            <h1 className="font-serif text-3xl font-bold text-[#1B3B36] capitalize">
              {activeTab}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C6DFE2] text-[#1B3B36] text-xs font-semibold">
              <Sparkles size={13} />
              Local Storage Demo Mode
            </span>
            <Link
              to="/"
              className="btn-bali py-2 px-4 text-xs bg-white hover:bg-gray-50"
            >
              Live Site →
            </Link>
          </div>
        </header>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
                <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                  Total Demo Bookings
                </span>
                <p className="font-serif text-3xl font-bold text-[#1B3B36] mt-2">
                  {appointments.length}
                </p>
                <p className="text-[11px] text-gray-400 mt-1">Saved in browser</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
                <span className="text-xs text-amber-600 uppercase tracking-wider font-semibold">
                  Pending Review
                </span>
                <p className="font-serif text-3xl font-bold text-amber-600 mt-2">
                  {pendingCount}
                </p>
                <p className="text-[11px] text-gray-400 mt-1">Awaiting confirmation</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
                <span className="text-xs text-emerald-700 uppercase tracking-wider font-semibold">
                  Approved Bookings
                </span>
                <p className="font-serif text-3xl font-bold text-emerald-700 mt-2">
                  {approvedCount}
                </p>
                <p className="text-[11px] text-gray-400 mt-1">Ready for guests</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
                <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                  Active Services
                </span>
                <p className="font-serif text-3xl font-bold text-[#1B3B36] mt-2">
                  {servicesList.length}
                </p>
                <p className="text-[11px] text-gray-400 mt-1">In treatment menu</p>
              </div>
            </div>

            {/* Recent Appointments Preview */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl font-bold text-[#1B3B36]">
                  Recent Appointment Requests
                </h2>
                <button
                  onClick={() => setActiveTab('appointments')}
                  className="text-xs text-[#D4A64A] font-semibold hover:underline"
                >
                  View All ({appointments.length}) →
                </button>
              </div>

              {appointments.length === 0 ? (
                <div className="py-12 text-center text-gray-500 text-sm">
                  No appointment requests have been saved yet. Use the booking bar on the public site to create demo bookings.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-gray-200 text-gray-500 uppercase tracking-wider">
                        <th className="pb-3 font-semibold">Guest</th>
                        <th className="pb-3 font-semibold">Service</th>
                        <th className="pb-3 font-semibold">Location</th>
                        <th className="pb-3 font-semibold">Date &amp; Time</th>
                        <th className="pb-3 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {appointments.slice(0, 5).map((a) => (
                        <tr key={a.id} className="hover:bg-gray-50/50">
                          <td className="py-3 font-medium text-gray-900">
                            {a.name}
                            <span className="block text-[11px] text-gray-400 font-normal">{a.phone}</span>
                          </td>
                          <td className="py-3 text-gray-700">{a.serviceName || a.service}</td>
                          <td className="py-3 text-gray-600">{a.location}</td>
                          <td className="py-3 text-gray-600">
                            {a.date} <span className="text-gray-400 font-light">({a.time})</span>
                          </td>
                          <td className="py-3">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                                a.status === 'Approved'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : a.status === 'Pending'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {a.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: APPOINTMENTS MANAGEMENT */}
        {activeTab === 'appointments' && (
          <div className="space-y-6 mt-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-gray-200">
              <div className="relative w-full sm:w-72">
                <Search size={16} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search guest or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#D4A64A]"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs text-gray-500">Filter:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="text-xs border border-gray-200 rounded-xl px-3 py-2 bg-white focus:outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Completed">Completed</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs">
              {filteredAppointments.length === 0 ? (
                <div className="py-12 text-center text-gray-500 text-sm">
                  No appointment records match your filter criteria.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-gray-200 text-gray-500 uppercase tracking-wider">
                        <th className="pb-3 font-semibold">Guest</th>
                        <th className="pb-3 font-semibold">Service</th>
                        <th className="pb-3 font-semibold">Location</th>
                        <th className="pb-3 font-semibold">Date &amp; Slot</th>
                        <th className="pb-3 font-semibold">Status</th>
                        <th className="pb-3 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredAppointments.map((a) => (
                        <tr key={a.id} className="hover:bg-gray-50/50">
                          <td className="py-3 font-medium text-gray-900">
                            {a.name}
                            <span className="block text-[11px] text-gray-500">{a.phone}</span>
                            {a.email && <span className="block text-[10px] text-gray-400">{a.email}</span>}
                          </td>
                          <td className="py-3 text-gray-700">
                            {a.serviceName || a.service}
                            {a.notes && (
                              <span className="block text-[10px] text-gray-400 italic mt-0.5">Note: {a.notes}</span>
                            )}
                          </td>
                          <td className="py-3 text-gray-600">{a.location}</td>
                          <td className="py-3 text-gray-600">
                            {a.date}
                            <span className="block text-[10px] text-gray-400">{a.time}</span>
                          </td>
                          <td className="py-3">
                            <select
                              value={a.status}
                              onChange={(e) => updateAppointmentStatus(a.id, e.target.value as Appointment['status'])}
                              className={`text-[11px] font-semibold px-2 py-1 rounded-lg border cursor-pointer ${
                                a.status === 'Approved'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                  : a.status === 'Pending'
                                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                                  : a.status === 'Completed'
                                  ? 'bg-blue-50 text-blue-800 border-blue-200'
                                  : 'bg-red-50 text-red-800 border-red-200'
                              }`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Approved">Approved</option>
                              <option value="Completed">Completed</option>
                              <option value="Rejected">Rejected</option>
                            </select>
                          </td>
                          <td className="py-3 text-right">
                            <button
                              onClick={() => deleteAppointment(a.id)}
                              className="text-gray-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                              title="Delete request"
                            >
                              <Trash2 size={15} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: SERVICES MENU MANAGEMENT */}
        {activeTab === 'services' && (
          <div className="space-y-6 mt-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#1B3B36]">
                  Active Spa &amp; Salon Services ({servicesList.length})
                </h2>
                <p className="text-xs text-gray-500">Live catalogue presented to customers</p>
              </div>
              <button
                onClick={handleAddSampleService}
                className="btn-bali py-2 px-4 text-xs bg-gradient-to-r from-[#D4A64A] via-[#FFF0A6] to-[#D4A64A] text-[#000000] font-bold hover:opacity-90 flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Plus size={14} />
                <span>Add Sample Service</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {servicesList.map((s) => (
                <div
                  key={s.slug}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-xs flex flex-col justify-between"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
                        <span>{s.category}</span>
                        <span>{s.duration}</span>
                      </div>
                      <h3 className="font-serif font-bold text-sm text-[#1B3B36]">{s.title}</h3>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">{s.description}</p>
                    </div>
                    <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="font-serif font-bold text-sm text-[#D4A64A]">{s.price}</span>
                      <button
                        onClick={() => handleDeleteService(s.slug)}
                        className="text-xs text-red-600 hover:underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: LEADS & ENQUIRIES */}
        {activeTab === 'enquiries' && (
          <div className="space-y-8 mt-8">
            {/* Membership Leads */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-4">
              <h2 className="font-serif text-xl font-bold text-[#1B3B36]">
                Membership Expressions of Interest ({membershipLeads.length})
              </h2>
              {membershipLeads.length === 0 ? (
                <p className="text-xs text-gray-500 py-4">No membership inquiries logged yet.</p>
              ) : (
                <div className="space-y-3">
                  {membershipLeads.map((m) => (
                    <div
                      key={m.id}
                      className="p-4 rounded-xl bg-[#FAF8F5] border border-gray-200 flex flex-col sm:flex-row justify-between sm:items-center gap-2 text-xs"
                    >
                      <div>
                        <strong className="text-sm font-serif text-[#1B3B36]">{m.name}</strong>
                        <p className="text-gray-500">{m.phone} · {m.email || 'No email'}</p>
                        <p className="text-[#D4A64A] font-medium mt-1">Package: {m.tierName} ({m.price})</p>
                      </div>
                      <div className="text-left sm:text-right">
                        <span className="text-[10px] text-gray-400 block">{m.createdAt?.slice(0, 10)}</span>
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#E6ECE8] text-[#1B3B36] text-[10px] font-semibold mt-1">
                          Branch: {m.branch}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Franchise Leads */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-4">
              <h2 className="font-serif text-xl font-bold text-[#1B3B36]">
                Franchise Partner Enquiries ({franchiseLeads.length})
              </h2>
              {franchiseLeads.length === 0 ? (
                <p className="text-xs text-gray-500 py-4">No franchise partnership enquiries logged yet.</p>
              ) : (
                <div className="space-y-3">
                  {franchiseLeads.map((f) => (
                    <div
                      key={f.id}
                      className="p-4 rounded-xl bg-[#FAF8F5] border border-gray-200 flex flex-col sm:flex-row justify-between sm:items-center gap-2 text-xs"
                    >
                      <div>
                        <strong className="text-sm font-serif text-[#1B3B36]">{f.name}</strong>
                        <p className="text-gray-500">{f.email} · {f.phone || 'No phone'}</p>
                        <p className="text-[#D4A64A] font-medium mt-1">Target City: {f.city}</p>
                      </div>
                      <span className="text-[10px] text-gray-400">{f.createdAt?.slice(0, 10)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 5: BAAN SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs max-w-2xl mt-8">
            <h2 className="font-serif text-2xl font-bold text-[#1B3B36] mb-1">
              BAAN Contact &amp; Business Settings
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              Update editable business variables shown across customer-facing routes.
            </p>

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 tracking-wider mb-1">
                  Concierge Phone Number
                </label>
                <input
                  type="text"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="input-bali"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 tracking-wider mb-1">
                  Concierge Email
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="input-bali"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 tracking-wider mb-1">
                  Primary Flagship Address
                </label>
                <textarea
                  rows={2}
                  value={contactAddress}
                  onChange={(e) => setContactAddress(e.target.value)}
                  className="input-bali resize-none"
                />
              </div>

              {savedNotice && (
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-medium flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  <span>Demonstration settings saved locally!</span>
                </div>
              )}

              <button
                type="submit"
                className="btn-bali py-2.5 px-6 bg-gradient-to-r from-[#D4A64A] via-[#FFF0A6] to-[#D4A64A] text-[#000000] font-bold hover:opacity-90 text-xs font-semibold uppercase cursor-pointer shadow-sm"
              >
                Save Settings
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};
