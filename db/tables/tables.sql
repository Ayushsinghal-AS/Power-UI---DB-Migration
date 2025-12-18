CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100),
  middle_name VARCHAR(100),
  last_name VARCHAR(100),
  figma_id VARCHAR(128),
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20),
  code_generate_limit_left INTEGER DEFAULT 0,
  is_active boolean default true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS subscription (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price_monthly NUMERIC(10,2),
  price_yearly NUMERIC(10,2),
  currency varchar(128),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS user_subscription (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  subscription_id INT NOT NULL,
  status VARCHAR(20) CHECK (status IN ('active','cancelled','expired','trialing')),
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  is_recurring BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS payment_provider (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS invoices (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  user_subscription_id INT,
  gross_amount NUMERIC(10,2),
  tax NUMERIC(10,2),
  other_amount NUMERIC(10,2),
  other_amount_type VARCHAR(50),
  total_amount NUMERIC(10,2),
  invoice_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS user_payment_history (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  payment_gateway_id INT,
  invoice_id INT,
  amount NUMERIC(10,2),
  currency VARCHAR(128),
  status VARCHAR(20) CHECK (status IN ('success','failed','refunded')),
  status_log TEXT,
  payment_provider_id INT,
  provider_json JSONB,
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);