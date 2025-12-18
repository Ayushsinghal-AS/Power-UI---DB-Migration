CREATE OR REPLACE FUNCTION fn_get_user(p_user_id INT)
RETURNS TEXT AS $$
BEGIN
  RETURN 'User Found';
END;
$$ LANGUAGE plpgsql;
