import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { testConnection } from './src/models/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';
const PORT = process.env.PORT || 3000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

const organizations = [
  {
    name: 'Green Earth Initiative',
    description: 'Dedicated to environmental conservation and tree planting projects.',
    image: '/images/org1.jpg'
  },
  {
    name: 'Bright Futures Education',
    description: 'Providing tutoring and educational resources to underserved youth.',
    image: '/images/org2.jpg'
  },
  {
    name: 'Community Care Collective',
    description: 'Supporting local shelters and community wellness programs.',
    image: '/images/org3.jpg'
  }
];

const serviceProjects = [
  { title: 'Beach Cleanup Day', category: 'Environmental', date: '2026-03-15' },
  { title: 'After-School Tutoring', category: 'Educational', date: '2026-03-20' },
  { title: 'Food Bank Support', category: 'Community Service', date: '2026-03-22' }
];

app.get('/', async (req, res) => {
  const pageTitle = 'Home';
  res.render('home', { title: pageTitle });
});

app.get('/organizations', async (req, res) => {
  const pageTitle = 'Organizations';
  res.render('organizations', { title: pageTitle, organizations });
});

app.get('/projects', async (req, res) => {
  const pageTitle = 'Service Projects';
  res.render('projects', { title: pageTitle, serviceProjects });
});

app.get('/categories', async (req, res) => {
  const pageTitle = 'Categories';
  const categories = ['Environmental', 'Educational', 'Community Service', 'Health and Wellness'];
  res.render('categories', { title: pageTitle, categories });
});

app.listen(PORT, async () => {
  try {
    await testConnection();
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
});