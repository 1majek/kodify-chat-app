const pool = require("./index");

const truncateTables = async () => {
  await pool.query(
    "SET FOREIGN_KEY_CHECKS = 0; truncate user; truncate message; SET FOREIGN_KEY_CHECKS = 1;"
  );
};

truncateTables().then(() => pool.end());
