const db = require('./database');

const obtenerCategorias = async () => {
  await db.connect();
  const result = await db.query("select * from categoria");
  await db.end();

  return result;
};
obtenerCategorias().then((result) => {
  console.log(result);
});
