const userQuery = require("../connection/dbCon");
const fs = require("fs");
const path = require("path");

const createUserQuery = async (payload) => {
  const {
    first_name,
    middle_name,
    last_name,
    figma_id,
    email,
    phone,
  } = payload;

  const procedureSQL = fs.readFileSync(
    path.join(__dirname, "../db/procedures/sp_create_user.sql"),
    "utf8"
  );

  const finalSQL = `
    BEGIN;

    ${procedureSQL}

    CALL sp_create_user(
      '${first_name}',
      ${middle_name ? `'${middle_name}'` : null},
      '${last_name}',
      ${figma_id ? `'${figma_id}'` : null},
      '${email}',
      ${phone ? `'${phone}'` : null}
    );

    COMMIT;
  `;

  await userQuery.PoolResult(finalSQL);
  return { success: true };
};

module.exports = {
  createUserQuery,
};
