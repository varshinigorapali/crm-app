import React, { useState, useEffect, useCallback } from 'react';
import { getLeads, deleteLead } from '../api/leads';
import LeadForm from './LeadForm';
import LeadDetail from './LeadDetail';

export default function LeadList() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editLead, setEditLead] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState('');

  const fetchLeads = useCallback(() => {
    const params = {};
    if (statusFilter) params.status = statusFilter;
    if (search) params.search = search;
    getLeads(params).then(setLeads).catch((err) => setError(err.message));
  }, [search, statusFilter]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  const handleSave = async (data) => {
    try {
      const { createLead, updateLead } = await import('../api/leads');
      if (editLead) {
        await updateLead(editLead._id, data);
      } else {
        await createLead(data);
      }
      setShowForm(false);
      setEditLead(null);
      fetchLeads();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this lead?')) return;
    try {
      await deleteLead(id);
      fetchLeads();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.reload();
  };

  if (selectedId) {
    return <LeadDetail leadId={selectedId} onBack={() => setSelectedId(null)} />;
  }

  return (
    <div className="lead-list">
      <header>
        <h1>Leads</h1>
        <div className="header-actions">
          <span>Welcome, {localStorage.getItem('username')}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      {error && <div className="error">{error}</div>}

      <div className="toolbar">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="converted">Converted</option>
        </select>
        <button className="btn-add" onClick={() => { setEditLead(null); setShowForm(true); }}>
          + Add Lead
        </button>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Source</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 && (
              <tr><td colSpan="6" className="empty">No leads found.</td></tr>
            )}
            {leads.map((lead) => (
              <tr key={lead._id}>
                <td><span className="link" onClick={() => setSelectedId(lead._id)}>{lead.name}</span></td>
                <td>{lead.email}</td>
                <td>{lead.source}</td>
                <td><span className={`badge ${lead.status}`}>{lead.status}</span></td>
                <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => { setEditLead(lead); setShowForm(true); }}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDelete(lead._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <LeadForm
          lead={editLead}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditLead(null); }}
        />
      )}
    </div>
  );
}
