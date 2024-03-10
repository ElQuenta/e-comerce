const {Client} = require ("pg");

const obtenerCategorias = async() => {

const client = new Client({
    user: 'root',
    host: 'dpg-cnlv7ted3nmc73aqfagg-a.frankfurt-postgres.render.com',
    database: 'ecomerce_p5fx',
    password: 'pcUKq8GuBvYakVwb490odI8oOoR8rfwB',
    port: 5432,
    ssl: {
        rejectUnauthorized: false,
    },
  })
  
await client.connect()
const res = await client.query("select * from categoria")
const result =res.rows 
await client.end()

return result;
};

obtenerCategorias().then((result) =>{
  console.log(result);
});