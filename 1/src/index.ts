import app from './app';
import http from 'http';

const server = http.createServer(app);

let PORT = process.env.PORT || 4100;

server.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
})


