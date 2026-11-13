import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import {
  extname,
  isAbsolute,
  relative,
  resolve,
} from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const DIST_DIRECTORY = fileURLToPath(new URL('../dist/', import.meta.url));
const INDEX_FILE = resolve(DIST_DIRECTORY, 'index.html');
const MIME_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

async function getStaticFile(pathname) {
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(pathname);
  } catch {
    return null;
  }

  const filePath = resolve(DIST_DIRECTORY, `.${decodedPath}`);
  const relativePath = relative(DIST_DIRECTORY, filePath);
  if (relativePath.startsWith('..') || isAbsolute(relativePath)) return null;

  try {
    const fileStat = await stat(filePath);
    return fileStat.isFile() ? filePath : null;
  } catch (error) {
    if (error.code === 'ENOENT' || error.code === 'ENOTDIR') return null;
    throw error;
  }
}

const server = createServer(async (request, response) => {
  let url;
  try {
    url = new URL(request.url, 'http://localhost');
  } catch {
    response.statusCode = 400;
    response.end('Invalid request URL.');
    return;
  }

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.setHeader('Allow', 'GET, HEAD');
    response.statusCode = 405;
    response.end('Method not allowed.');
    return;
  }

  try {
    let filePath = await getStaticFile(url.pathname);
    if (!filePath) {
      if (extname(url.pathname)) {
        response.statusCode = 404;
        response.end('Not found.');
        return;
      }
      filePath = INDEX_FILE;
    }

    const content = await readFile(filePath);
    response.setHeader(
      'Content-Type',
      MIME_TYPES[extname(filePath).toLowerCase()] ?? 'application/octet-stream',
    );
    response.setHeader('Content-Length', content.length);
    response.setHeader('Cache-Control', 'no-cache');
    response.statusCode = 200;
    response.end(request.method === 'HEAD' ? undefined : content);
  } catch (error) {
    console.error('Unable to serve the built application.', error);
    response.statusCode = 500;
    response.end('Unable to serve the application.');
  }
});

const port = Number(process.env.PORT ?? 4173);
const host = process.env.HOST ?? '0.0.0.0';
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error(`Invalid PORT value: ${process.env.PORT}`);
}

server.listen(port, host, () => {
  console.log(`Rajya Dossier listening on http://${host}:${port}`);
});
