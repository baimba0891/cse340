// Import any needed model functions
import { getUpcomingProjects, getProjectDetails, updateProject } from '../models/projects.js';
import { getAllOrganizations } from '../models/organizations.js';
import { getCategoriesByProjectId } from '../models/categories.js';
const NUMBER_OF_UPCOMING_PROJECTS = 5;

// Define any controller functions
const showProjectsPage = async (req, res) => {
  const serviceProjects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
  const title = 'Upcoming Service Projects';
    res.render('projects', { title, serviceProjects });
};

const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.id;
  const project = await getProjectDetails(projectId);
  const categories = await getCategoriesByProjectId(projectId);
    const title = 'Project Details';

  res.render('project', { title, project, categories });
  };
  
  const showEditProjectForm = async (req, res) => {
  const projectId = req.params.id;
  const project = await getProjectDetails(projectId);
  const organizations = await getAllOrganizations();
  const title = 'Edit Project';
  res.render('edit-project', { title, project, organizations });
};

const processEditProjectForm = async (req, res) => {
  const projectId = req.params.id;
  const { title, description, location, project_date, organization_id } = req.body;
  await updateProject(projectId, title, description, location, project_date, organization_id);
  res.redirect(`/project/${projectId}`);
};

// Export any controller functions
export { showProjectsPage, showProjectDetailsPage, showEditProjectForm, processEditProjectForm };

