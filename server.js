const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {

    // 1. Evitar solicitud de favicon.ico
    if (req.url === '/favicon.ico') {
        res.writeHead(204);
        res.end();
        return;
    }

    // 2. MANEJO DE RUTA RAÍZ: Si el usuario entra a "/", sirve el index.html
    let relativePath = req.url === '/' ? 'index.html' : req.url;
    
    // Obtén la ruta absoluta del archivo solicitado dentro de 'public'
    const filePath = path.join(__dirname, 'public', relativePath);

    console.log('Ruta del archivo solicitado:', filePath);

    // 3. Verifica si es un directorio para evitar el error que te salió en Render
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        res.writeHead(403); // Prohibido leer directorios
        res.end('Acceso denegado a directorio');
        return;
    }

    // Lee el archivo solicitado y responde con su contenido
    fs.readFile(filePath, (err, content) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - Archivo no encontrado</h1>');
            } else {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('Error del servidor');
            }
        } else {
            const ext = path.extname(filePath);
            let contentType = 'text/html';

            switch (ext) {
                case '.js': contentType = 'text/javascript'; break;
                case '.css': contentType = 'text/css'; break;
                case '.json': contentType = 'application/json'; break;
                case '.png': contentType = 'image/png'; break;
                case '.jpg': contentType = 'image/jpeg'; break;
            }

            console.log('Sirviendo archivo:', filePath);
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

// 4. AJUSTE DE PUERTO PARA RENDER (USA EL PUERTO QUE ELLOS TE DEN O EL 3000)
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto: ${PORT}`);
});