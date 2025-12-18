CREATE TRIGGER trg_user_audit
AFTER INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION trg_user_audit_fn();