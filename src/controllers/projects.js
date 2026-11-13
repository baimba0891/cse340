// Import any needed model functions
import { getAllProjects } from '../models/projects.js';

// Define any controller functions
const showProjectsPage = async (req, res) => {
    const serviceProjects = await getAllProjects();
    const title = 'Service Projects';

    res.render('projects', { title, serviceProjects });
};

// Export any controller functions
export { showProjectsPage };