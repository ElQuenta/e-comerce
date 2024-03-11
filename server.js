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
    await db.connect();
    const result = await db.query('SELECT * FROM categoria');
    console.log(result)
    await db.end();
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


// Ruta para servir el archivo HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
