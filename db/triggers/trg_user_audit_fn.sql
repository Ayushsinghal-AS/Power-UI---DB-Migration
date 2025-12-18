CREATE OR REPLACE FUNCTION trg_user_audit_fn()
RETURNS trigger AS $$
BEGIN
  INSERT INTO audit_log(table_name) VALUES ('users');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;