import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { testConnection } from './src/models/db.js';
import router from './src/routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';
const PORT = process.env.PORT || 3000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use((req, res, next) => {
    if (NODE_ENV === 'development') {
        console.log(`${req.method} ${req.url}`);
    }
    next();
});

app.use((req, res, next) => {
    res.locals.NODE_ENV = NODE_ENV;
    next();
});
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

// Use the imported router to handle routes
app.use(router);

app.use((req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.error('Error occurred:', err.message);
    console.error('Stack trace:', err.stack);

    const status = err.status || 500;
    const template = status === 404 ? '404' : '500';

    const context = {
        title: status === 404 ? 'Page Not Found' : 'Server Error',
        error: err.message,
        stack: err.stack
    };
  
    res.status(status).render(`errors/${template}`, context);
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