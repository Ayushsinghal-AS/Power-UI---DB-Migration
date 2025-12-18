CREATE OR REPLACE PROCEDURE sp_create_user(
  p_first_name VARCHAR,
  p_middle_name VARCHAR,
  p_last_name VARCHAR,
  p_figma_id VARCHAR,
  p_email VARCHAR,
  p_phone VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN

  IF EXISTS (SELECT 1 FROM users WHERE email = p_email) THEN
    RAISE EXCEPTION 'User with email already exists';
  END IF;

  INSERT INTO users (
    first_name,
    middle_name,
    last_name,
    figma_id,
    email,
    phone
  ) VALUES (
    p_first_name,
    p_middle_name,
    p_last_name,
    p_figma_id,
    p_email,
    p_phone
  );

END;
$$;