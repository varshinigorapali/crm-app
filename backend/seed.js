require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const Lead = require('./models/Lead');

const dummyLeads = [
  { name: 'Alice Johnson', email: 'alice@example.com', phone: '555-0101', source: 'website', status: 'new', notes: [{ text: 'Interested in premium plan' }] },
  { name: 'Bob Smith', email: 'bob@example.com', phone: '555-0102', source: 'referral', status: 'contacted', notes: [{ text: 'Called back — wants a demo' }, { text: 'Sent pricing sheet' }] },
  { name: 'Carol White', email: 'carol@example.com', phone: '555-0103', source: 'social', status: 'converted', notes: [{ text: 'Signed up for annual plan' }, { text: 'Onboarding completed' }] },
  { name: 'David Brown', email: 'david@example.com', phone: '555-0104', source: 'email', status: 'new' },
  { name: 'Eve Davis', email: 'eve@example.com', phone: '555-0105', source: 'website', status: 'contacted', notes: [{ text: 'Asked about team pricing' }] },
  { name: 'Frank Miller', email: 'frank@example.com', phone: '555-0106', source: 'referral', status: 'new', notes: [{ text: 'Referred by Bob Smith' }] },
  { name: 'Grace Wilson', email: 'grace@example.com', phone: '555-0107', source: 'social', status: 'converted', notes: [{ text: 'Upgraded to enterprise' }] },
  { name: 'Hank Moore', email: 'hank@example.com', phone: '555-0108', source: 'website', status: 'new' },
  { name: 'Ivy Taylor', email: 'ivy@example.com', phone: '555-0109', source: 'email', status: 'contacted', notes: [{ text: 'Follow up next week' }] },
  { name: 'Jack Anderson', email: 'jack@example.com', phone: '555-0110', source: 'other', status: 'new', notes: [{ text: 'Met at trade show' }] },
  { name: 'Karen Thomas', email: 'karen@example.com', phone: '555-0111', source: 'website', status: 'contacted', notes: [{ text: 'Requested callback' }, { text: 'Left voicemail' }] },
  { name: 'Leo Jackson', email: 'leo@example.com', phone: '555-0112', source: 'referral', status: 'converted', notes: [{ text: 'Happy customer — referred 2 friends' }] },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  await Admin.deleteMany({});
  await Admin.create({ username: 'admin', password: 'admin123' });
  console.log('Created admin user: admin / admin123');

  await Lead.deleteMany({});
  const leads = await Lead.insertMany(dummyLeads);
  console.log(`Inserted ${leads.length} dummy leads`);

  await mongoose.disconnect();
  console.log('Done!');
}

seed().catch((err) => { console.error(err); process.exit(1); });
