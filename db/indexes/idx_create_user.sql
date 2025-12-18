CREATE INDEX IF NOT EXISTS idx_user_subscription_user_id
  ON user_subscription(user_id);

CREATE INDEX IF NOT EXISTS idx_user_subscription_sub_id
  ON user_subscription(subscription_id);

CREATE INDEX IF NOT EXISTS idx_invoices_user_id
  ON invoices(user_id);

CREATE INDEX IF NOT EXISTS idx_invoices_subscription_id
  ON invoices(user_subscription_id);

CREATE INDEX IF NOT EXISTS idx_payment_history_user_id
  ON user_payment_history(user_id);

CREATE INDEX IF NOT EXISTS idx_payment_history_payment_gateway_id
  ON user_payment_history(payment_gateway_id);

CREATE INDEX IF NOT EXISTS idx_payment_history_invoice_id
  ON user_payment_history(invoice_id);