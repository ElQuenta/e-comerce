const { Client } = require("pg");

class Database {
  constructor() {
    if (!Database.instance) {
      this.client = new Client({
        user: 'root',
        host: 'dpg-cnlv7ted3nmc73aqfagg-a.frankfurt-postgres.render.com',
        database: 'ecomerce_p5fx',
        password: 'pcUKq8GuBvYakVwb490odI8oOoR8rfwB',
        port: 5432,
        ssl: {
          rejectUnauthorized: false,
        },
      });
      Database.instance = this;
    }

    return Database.instance;
  }

  async connect() {
    await this.client.connect();
  }

  async query(sql) {
    const res = await this.client.query(sql);
    return res.rows;
  }

  async end() {
    await this.client.end();
  }
}

// Exporta una instancia única del cliente de base de datos
module.exports = new Database();
