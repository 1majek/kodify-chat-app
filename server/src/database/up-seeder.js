const pool = require("./index");

const users = [
  {
    id: 1,
    name: "Steven",
  },
  {
    id: 2,
    name: "kody",
  },
];

const insertDummyData = async () => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();
    await connection.query("INSERT INTO user (name) VALUES ?", [
      users.map((user) => [
        user.name
      ]),
    ]);
    await connection.commit();
  } catch (e) {
    console.log(e);
    connection.rollback();
  } finally {
    connection.release();
  }
};

insertDummyData().then(() => pool.end());
