const express = require('express');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname) + '/frontend/index.html');
});

const PORT = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`App corriendo en el puerto: ${port}`);
});