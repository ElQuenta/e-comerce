const db = require('./database');

const obtenerCategorias = async () => {
  await db.connect();
  const result = await db.query("select * from categoria");
  await db.end();

  return result;
};

const insertarUsuario = async (nombre, email, password) => {
  await db.connect();
  const result = await db.query();
  await db.end();

  return result;
};

document.getElementById('')

obtenerCategorias().then((result) => {
  console.log(result);
});
