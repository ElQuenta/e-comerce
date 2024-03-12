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

document.getElementById('registrarseBtn').addEventListener('click', async()=>{
  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
      await insertarUsuario(nombre, email, password);
      alert('Usuario registrado correctamente');
  } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('Error al registrar usuario');
  }
})

obtenerCategorias().then((result) => {
  console.log(result);
});
 //Creo que sin todo este .js funciona