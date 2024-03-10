const express = require('express');
const app = express();

// Conexión a la base de datos
const db = require('./database');

// Ruta para obtener categorías desde la base de datos
app.get('/categorias', async (req, res) => {
  try {
    await db.connect();
    const result = await db.query('SELECT * FROM categoria');
    await db.end();
    res.json(result.rows);
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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
