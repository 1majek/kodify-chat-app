const pool = require("./index");

const users = [
  {
    nickname: null,
    email: "majek1@hotmail.com",
    password: "steven",
  },
  {
    nickname: null,
    email: "kody@hotmail.com",
    password: "kody",
  },
];

const insertDummyData = async () => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();
    await connection.query("INSERT INTO user (nickname, email, password) VALUES ?", [
      users.map((user) => [
        user.nickname,
        user.email,
        user.password
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
