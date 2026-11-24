// Import any needed model functions
import { getAllCategories, getCategoryDetails, createCategory, updateCategory } from '../models/categories.js';
import { getProjectsByCategoryId } from '../models/projects.js';

// Define any controller functions
const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Project Categories';

    res.render('categories', { title, categories });
};

const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;
    const category = await getCategoryDetails(categoryId);
    const projects = await getProjectsByCategoryId(categoryId);
    const title = 'Category Details';

    res.render('category', { title, category, projects });
};
const showNewCategoryForm = async (req, res) => {
  const title = 'Create New Category';
  res.render('new-category', { title, errors: [], category: { name: '' } });
};

const processNewCategoryForm = async (req, res) => {
  const { name } = req.body;
  const errors = [];
  if (!name || !name.trim()) {
    errors.push('Category name is required.');
  } else {
    if (name.trim().length < 3) errors.push('Category name must be at least 3 characters.');
    if (name.trim().length > 100) errors.push('Category name must be no more than 100 characters.');
  }
  if (errors.length > 0) {
    return res.render('new-category', { title: 'Create New Category', errors, category: { name } });
  }
  try {
    await createCategory(name.trim());
    res.redirect('/categories');
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).send('Error creating category');
  }
};

const showEditCategoryForm = async (req, res) => {
  const categoryId = req.params.id;
  const category = await getCategoryDetails(categoryId);
  if (!category) {
    return res.status(404).send('Category not found');
  }
  const title = 'Edit Category';
  res.render('edit-category', { title, errors: [], category });
};

const processEditCategoryForm = async (req, res) => {
  const categoryId = req.params.id;
  const { name } = req.body;
  const errors = [];
  if (!name || !name.trim()) {
    errors.push('Category name is required.');
  } else {
    if (name.trim().length < 3) errors.push('Category name must be at least 3 characters.');
    if (name.trim().length > 100) errors.push('Category name must be no more than 100 characters.');
  }
  if (errors.length > 0) {
    return res.render('edit-category', { title: 'Edit Category', errors, category: { category_id: categoryId, name } });
  }
  try {
    await updateCategory(categoryId, name.trim());
    res.redirect(`/category/${categoryId}`);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).send('Error updating category');
  }
};
// Export any controller functions
export { showCategoriesPage, showCategoryDetailsPage, showNewCategoryForm, processNewCategoryForm, showEditCategoryForm, processEditCategoryForm };