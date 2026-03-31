const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT ? Number(process.env.PORT) : 8080;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8'
};

function safePath(urlPath) {
  const raw = decodeURIComponent(urlPath.split('?')[0]);
  const normalized = path.normalize(raw).replace(/^([\\/])+/, '');
  return path.join(ROOT, normalized);
}

function readFile(filePath, res) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('500 Internal Server Error');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const type = MIME[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  let target = safePath(req.url || '/');

  if (!target.startsWith(ROOT)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(target, (err, stats) => {
    if (!err && stats.isDirectory()) {
      target = path.join(target, 'index.html');
    }

    fs.stat(target, (err2, stats2) => {
      if (!err2 && stats2.isFile()) {
        readFile(target, res);
        return;
      }

      const fallback404 = path.join(ROOT, '404.html');
      fs.stat(fallback404, (err3, stats3) => {
        if (!err3 && stats3.isFile()) {
          fs.readFile(fallback404, (err4, data404) => {
            if (err4) {
              res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
              res.end('404 Not Found');
              return;
            }
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data404);
          });
          return;
        }

        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404 Not Found');
      });
    });
  });
});

server.listen(PORT, () => {
  console.log(`Site is running at http://localhost:${PORT}`);
  console.log('Press Ctrl + C to stop server.');
});
