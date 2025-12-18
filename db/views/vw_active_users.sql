CREATE OR REPLACE VIEW vw_active_users AS
SELECT * FROM users WHERE active = true;
