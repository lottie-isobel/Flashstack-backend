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
      const response = await db.query("SELECT * FROM Volunteer WHERE userid = $1", [
        id,
      ]);
      if (response.rows.length != 1) {
        throw new Error("Unable to locate user.");
      }
      return new User(response.rows[0]);
    }
  
    static async getOneByEmail(email) {
      const response = await db.query("SELECT * FROM Volunteer WHERE email = $1", [
        email,
      ]);
      if (response.rows.length != 1) {
        throw new Error("Unable to locate user.");
      }
      return new User(response.rows[0]);
    }
  
    static async create(data) {
      const { first_name, last_name, email, password } = data;
      let response = await db.query(
        "INSERT INTO Volunteer (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING userid;",
        [first_name, last_name, email, password]
      );
      const newId = response.rows[0].userid;
      const newUser = await User.getOneById(newId);
      return newUser;
    }
  }
  
  module.exports = User;