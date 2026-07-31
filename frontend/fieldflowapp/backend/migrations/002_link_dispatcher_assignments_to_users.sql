-- Dispatcher assignments must reference registered technician users.
-- Existing assignment rows are retained.
ALTER TABLE dispatcher_assignments
  DROP CONSTRAINT IF EXISTS dispatcher_assignments_technician_id_fkey;

ALTER TABLE dispatcher_assignments
  ADD CONSTRAINT dispatcher_assignments_technician_id_fkey
  FOREIGN KEY (technician_id) REFERENCES users(id);
