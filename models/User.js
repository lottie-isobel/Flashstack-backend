const db = require("../database/connect");

class User {
    constructor({ userid, first_name, last_name, email, password }) {
      this.id = userid;
      this.first_name = first_name;
      this.last_name = last_name;
      this.email = email;
      this.password = password;
    }
  
    static async getOneById(id) {
      const response = await db.query("SELECT * FROM users WHERE userid = $1", [
        id,
      ]);
      if (response.rows.length != 1) {
        throw new Error("Unable to locate user.");
      }
      return new User(response.rows[0]);
    }
  
    static async getOneByEmail(email) {
      const response = await db.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
      if (response.rows.length != 1) {
        throw new Error("Unable to locate user.");
      }
      return new User(response.rows[0]);
    }

    static async getOneByToken(token){
      const response = await db.query("SELECT u.* FROM tokens t JOIN users u ON t.userid = u.userid WHERE t.token = $1;", [token])
      return new User(response.rows[0])
    }
  
    static async create(data) {
      const { first_name, last_name, email, password } = data;
      let response = await db.query(
        "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING userid;",
        [first_name, last_name, email, password]
      );
      const newId = response.rows[0].userid;
      const newUser = await User.getOneById(newId);
      return newUser;
    }
  }
  
  module.exports = User;