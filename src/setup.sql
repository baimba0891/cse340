-- W02: Service Projects - links to existing organization table

CREATE TABLE service_projects (
  project_id SERIAL PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES organization(organization_id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255),
  project_date DATE NOT NULL
);

INSERT INTO service_projects (organization_id, title, description, location, project_date) VALUES
(1, 'Community Food Drive', 'Collect and sort canned food for local families', 'Downtown Community Center', '2026-04-12'),
(1, 'Park Cleanup', 'Pick up litter and plant trees in Riverside Park', 'Riverside Park', '2026-05-03'),
(1, 'After-School Tutoring', 'Volunteer tutoring for elementary students', 'Main Public Library', '2026-04-20'),
(1, 'Senior Tech Help Day', 'Help seniors set up phones and email', 'Senior Center', '2026-05-10'),
(1, 'Winter Coat Collection', 'Collect coats for winter distribution', 'Community Hall', '2026-06-01'),
(2, 'Beach Cleanup', 'Remove plastic and debris from shoreline', 'North Beach', '2026-04-18'),
(2, 'Tree Planting Day', 'Plant 100 native trees', 'Green City Park', '2026-05-15'),
(2, 'Recycling Workshop', 'Teach families how to sort recycling', 'City Hall Room B', '2026-04-25'),
(2, 'Community Garden Build', 'Build raised beds for community garden', 'Eastside Lot', '2026-05-22'),
(2, 'River Trail Restoration', 'Clear and repair river trail', 'River Trailhead', '2026-06-08'),
(3, 'Library Book Sort', 'Sort and catalog donated books', 'Main Public Library', '2026-06-15'),
(3, 'Youth STEM Workshop', 'Hands-on science activities for youth', 'Youth Center', '2026-04-29'),
(3, 'Food Bank Distribution', 'Pack and distribute food boxes', 'Food Bank Warehouse', '2026-05-08'),
(3, 'Hygiene Kit Drive', 'Collect and deliver hygiene kits', 'Shelter Downtown', '2026-05-30'),
(3, 'Mental Health Awareness Walk', 'Community walk and resource fair', 'Central Park', '2026-06-20');