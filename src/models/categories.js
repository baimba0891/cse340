import db from './db.js'

const getAllCategories = async () => {
  const query = `
    SELECT category_id, name
    FROM public.categories
    ORDER BY name;
  `;
  const result = await db.query(query);
  return result.rows;
}

const getCategoryDetails = async (categoryId) => {
      const query = `
        SELECT
          category_id,
          name
        FROM public.categories
        WHERE category_id = $1;
      `;

      const queryParams = [categoryId];
      const result = await db.query(query, queryParams);

      return result.rows.length > 0 ? result.rows[0] : null;
};

const getCategoriesByProjectId = async (projectId) => {
      const query = `
        SELECT
          c.category_id,
          c.name
        FROM public.categories c
        JOIN public.project_categories pc ON c.category_id = pc.category_id
        WHERE pc.project_id = $1
        ORDER BY c.name;
      `;

      const queryParams = [projectId];
      const result = await db.query(query, queryParams);

      return result.rows;
};
const createCategory = async (name) => {
  const query = `
    INSERT INTO public.categories (name)
    VALUES ($1)
    RETURNING category_id, name;
  `;
  const result = await db.query(query, [name]);
  return result.rows[0];
};

const updateCategory = async (categoryId, name) => {
  const query = `
    UPDATE public.categories
    SET name = $1
    WHERE category_id = $2
    RETURNING category_id, name;
  `;
  const result = await db.query(query, [name, categoryId]);
  return result.rows[0];
};
export { getAllCategories, getCategoryDetails, getCategoriesByProjectId, createCategory, updateCategory };