import http from 'http';
import url from 'url';

const servidor = http.createServer((req, res) => {
    const urlProcesada = url.parse(req.url, true);
    const pathname = urlProcesada.pathname;
    const queryParams = urlProcesada.query;
    
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }
    
    let responseData = '';
    let statusCode = 200;
    
    // Route handling - 6 endpoints
    if (pathname === '/api/sec1') {
        // SEC1 - Promise example
        responseData = JSON.stringify({ 
            section: "SEC1",
            description: "Promise example",
            data: "The masters tools will never dismantle the master's house"
        });
    } else if (pathname === '/api/sec2') {
        // SEC2 - Async/Await
        const asyncOperation = () => new Promise(resolve => 
            setTimeout(() => resolve("Async operation completed"), 100)
        );
        responseData = JSON.stringify({ 
            section: "SEC2",
            description: "Async/Await example",
            data: "Freedom is a constant struggle"
        });
    } else if (pathname === '/api/sec3') {
        // SEC3 - Callbacks
        responseData = JSON.stringify({ 
            section: "SEC3",
            description: "Callback example",
            data: "Callback processed successfully"
        });
    } else if (pathname === '/api/sec4') {
        // SEC4 - Event Emitter
        responseData = JSON.stringify({ 
            section: "SEC4",
            description: "Event Emitter example",
            data: "Event emitted successfully"
        });
    } else if (pathname === '/api/sec5') {
        // SEC5 - Error handling
        responseData = JSON.stringify({ 
            section: "SEC5",
            description: "Error handling example",
            data: "No errors encountered"
        });
    } else if (pathname === '/api/sec6') {
        // SEC6 - File system operations
        responseData = JSON.stringify({ 
            section: "SEC6",
            description: "File system example",
            data: "File operations completed"
        });
    } else if (pathname === '/') {
        // Root endpoint - list all available endpoints
        responseData = JSON.stringify({ 
            message: "Welcome to the API",
            endpoints: [
                "/api/sec1",
                "/api/sec2", 
                "/api/sec3",
                "/api/sec4",
                "/api/sec5",
                "/api/sec6"
            ]
        });
    } else {
        statusCode = 404;
        responseData = JSON.stringify({ error: "Endpoint not found" });
    }
    
    console.log(`${req.method} ${pathname}`);
    
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(responseData);
});

// Use PORT from environment variable (Render provides this)
const puerto = process.env.PORT || 3000;

servidor.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
});