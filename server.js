const express = require('express');
const app = express();

// Conexión a la base de datos
const db = require('./database');
db.connect();

app.use(express.static('public'));

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

// Ruta para servir el archivo HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
