import React, { useState, useEffect } from 'react';
import { getLead, updateLead, addNote, deleteNote } from '../api/leads';

export default function LeadDetail({ leadId, onBack }) {
  const [lead, setLead] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getLead(leadId).then(setLead).catch((err) => setError(err.message));
  }, [leadId]);

  const handleStatus = async (status) => {
    const updated = await updateLead(leadId, { status });
    setLead(updated);
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    const updated = await addNote(leadId, noteText);
    setLead(updated);
    setNoteText('');
  };

  const handleDeleteNote = async (noteId) => {
    const updated = await deleteNote(leadId, noteId);
    setLead(updated);
  };

  if (error) return <div className="error">{error}</div>;
  if (!lead) return <div className="loading">Loading...</div>;

  return (
    <div className="lead-detail">
      <button className="btn-back" onClick={onBack}>&larr; Back</button>
      <div className="detail-header">
        <div>
          <h2>{lead.name}</h2>
          <p className="meta">{lead.email} {lead.phone && `| ${lead.phone}`} | Source: {lead.source}</p>
        </div>
        <div className="status-group">
          {['new', 'contacted', 'converted'].map((s) => (
            <button
              key={s}
              className={`status-btn ${lead.status === s ? 'active' : ''} ${s}`}
              onClick={() => handleStatus(s)}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="notes-section">
        <h3>Notes & Follow-ups</h3>
        <form onSubmit={handleAddNote} className="note-form">
          <textarea
            placeholder="Add a note..."
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            rows={3}
          />
          <button type="submit">Add Note</button>
        </form>
        <div className="notes-list">
          {lead.notes.length === 0 && <p className="empty">No notes yet.</p>}
          {[...lead.notes].reverse().map((note) => (
            <div key={note._id} className="note-card">
              <p>{note.text}</p>
              <span className="note-date">{new Date(note.createdAt).toLocaleString()}</span>
              <button className="btn-delete" onClick={() => handleDeleteNote(note._id)}>&times;</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
