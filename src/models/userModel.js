const mysql = require("mysql2/promise");

class Database {
  constructor() {
    if (!Database.instance) {
      this.pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });
      Database.instance = this;
    }
    return Database.instance;
  }

  async deleteUser(id) {
    const [result] = await this.pool.query("DELETE FROM users WHERE id = ?", [id]);
    return result;
  }
}

const dbInstance = new Database();

module.exports = {
  deleteUserDB: (id) => dbInstance.deleteUser(id),
};
