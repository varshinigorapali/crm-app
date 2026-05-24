require('dotenv').config();
const mongoose = require('mongoose');
const Lead = require('./models/Lead');

const extra = [
  { name: 'Maria Garcia', email: 'maria@example.com', phone: '555-0113', source: 'website', status: 'new', notes: [{ text: 'Looking for basic plan info' }] },
  { name: 'Nathan Lee', email: 'nathan@example.com', phone: '555-0114', source: 'social', status: 'contacted', notes: [{ text: 'DM on Twitter — sent link' }] },
  { name: 'Olivia Perez', email: 'olivia@example.com', phone: '555-0115', source: 'referral', status: 'converted', notes: [{ text: 'Referred by Alice Johnson' }, { text: 'Signed weekly plan' }] },
  { name: 'Paul Kim', email: 'paul@example.com', phone: '555-0116', source: 'email', status: 'new' },
  { name: 'Quinn Roberts', email: 'quinn@example.com', phone: '555-0117', source: 'website', status: 'new', notes: [{ text: 'Abandoned cart — follow up' }] },
  { name: 'Rachel Turner', email: 'rachel@example.com', phone: '555-0118', source: 'other', status: 'contacted', notes: [{ text: 'Phone consultation scheduled' }] },
  { name: 'Sam Phillips', email: 'sam@example.com', phone: '555-0119', source: 'social', status: 'converted', notes: [{ text: 'Lifetime member' }] },
  { name: 'Tina Campbell', email: 'tina@example.com', phone: '555-0120', source: 'website', status: 'new' },
  { name: 'Uma Patel', email: 'uma@example.com', phone: '555-0121', source: 'referral', status: 'contacted', notes: [{ text: 'Interested in team discount' }] },
  { name: 'Victor Nguyen', email: 'victor@example.com', phone: '555-0122', source: 'email', status: 'new', notes: [{ text: 'Opened campaign — clicked CTA' }] },
  { name: 'Wendy Foster', email: 'wendy@example.com', phone: '555-0123', source: 'website', status: 'contacted', notes: [{ text: 'Left message — call back Thu' }] },
  { name: 'Xander Cruz', email: 'xander@example.com', phone: '555-0124', source: 'social', status: 'converted', notes: [{ text: 'Instagram campaign lead — closed' }] },
  { name: 'Yara Hassan', email: 'yara@example.com', phone: '555-0125', source: 'other', status: 'new', notes: [{ text: 'Came from webinar' }] },
  { name: 'Zack Brooks', email: 'zack@example.com', phone: '555-0126', source: 'referral', status: 'new' },
  { name: 'Aisha Patel', email: 'aisha@consultant.com', phone: '555-0127', source: 'website', status: 'contacted', notes: [{ text: 'Needs custom quote' }] },
  { name: 'Ben Carter', email: 'ben@startup.io', phone: '555-0128', source: 'social', status: 'new', notes: [{ text: 'LinkedIn connect — interested' }] },
  { name: 'Clara Dunn', email: 'clara@healthplus.com', phone: '555-0129', source: 'email', status: 'converted', notes: [{ text: 'Enterprise deal closed' }, { text: 'Intro call done', createdAt: new Date(Date.now() - 86400000) }] },
  { name: 'Diego Ramirez', email: 'diego@devshop.co', phone: '555-0130', source: 'referral', status: 'contacted' },
];

async function seedMore() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected');
  const leads = await Lead.insertMany(extra);
  console.log(`Added ${leads.length} more leads`);
  await mongoose.disconnect();
}

seedMore().catch((e) => { console.error(e); process.exit(1); });
