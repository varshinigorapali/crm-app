import React, { useState } from 'react';

export default function LeadForm({ onSave, onCancel, lead }) {
  const [name, setName] = useState(lead ? lead.name : '');
  const [email, setEmail] = useState(lead ? lead.email : '');
  const [phone, setPhone] = useState(lead ? lead.phone || '' : '');
  const [source, setSource] = useState(lead ? lead.source : 'website');
  const [status, setStatus] = useState(lead ? lead.status : 'new');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, email, phone, source, status });
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{lead ? 'Edit Lead' : 'Add Lead'}</h2>
        <form onSubmit={handleSubmit}>
          <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <select value={source} onChange={(e) => setSource(e.target.value)}>
            <option value="website">Website</option>
            <option value="referral">Referral</option>
            <option value="social">Social Media</option>
            <option value="email">Email Campaign</option>
            <option value="other">Other</option>
          </select>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="converted">Converted</option>
          </select>
          <div className="modal-actions">
            <button type="submit">{lead ? 'Update' : 'Create'}</button>
            <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
