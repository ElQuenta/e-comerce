const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Conexión a la base de datos
const db = require('./database');
db.connect();

app.use(express.static('public'));
app.use(bodyParser.json());

// Ruta para obtener categorías desde la base de datos
app.get('/categorias', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM categoria');
    console.log(result)
    res.json(result);
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/catalogo-perros', async (req, res) => {
  try {
    const result = await db.query('SELECT id_producto, nombre_producto, url FROM producto where id_categoria = 1');
    console.log(result)
    res.json(result);
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/catalogo-gatos', async (req, res) => {
  try {
    const result = await db.query('SELECT id_producto, nombre_producto, url FROM producto where id_categoria = 2');
    console.log(result)
    res.json(result);
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/productos/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const result = await db.query('SELECT * FROM producto where id_producto = '+productId);
    console.log(result)
    res.json(result);
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post("/users", async(req,res) => {
  console.log(req.body);
  const { nombre, apellido, correoelectronico, contrasena} = req.body
  const query = `INSERT INTO usuario (nombre, apellido, contrasena, correoelectronico)
                 VALUES ('${nombre}', '${apellido}', '${contrasena}', '${correoelectronico}')`;
  db.query(query);
  res.status(201).json({ message: 'Usuario creado correctamente' });
});

app.post("/login", async(req,res) => {
  const { email, password } = req.body;

  // Realizar la verificación de las credenciales en la base de datos
  const query = `SELECT * FROM usuario WHERE correoelectronico = '${email}' AND contrasena = '${password}'`;
  const result = await db.query(query);

  if (result.length > 0) {
    res.status(200).json({ message: 'Inicio de sesión exitoso' });
  } else {
    res.status(401).json({ message: 'Credenciales inválidas' });
  }
});


app.post("/addToCart/:id", async (req, res) => {
  const productId = parseInt(req.params.id);
  const { quantity } = parseInt(req.body);

  try {
      const product = await db.query('SELECT * FROM producto WHERE id_producto = $1', [productId]);
      if (!product || product[0].stock < quantity) {
          return res.status(400).json({ message: 'No hay suficiente stock' });
      }

      // Restar la cantidad del stock en la base de datos
      await db.query('UPDATE producto SET stock = stock - $1 WHERE id_producto = $2', [(quantity), productId]);

      res.status(200).json({ message: 'Producto añadido al carrito' });
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Error al procesar la solicitud' });
  }
});

// Ruta para servir el archivo HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
