import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

const siteDir = path.join(__dirname, 'site');

// Serve static assets from the site directory
app.use(express.static(siteDir, {
  extensions: ['html'],
  index: 'index.html'
}));

// Route fallback for extensionless navigation
app.use((req, res, next) => {
  if (req.method !== 'GET') {
    return next();
  }
  if (req.path.includes('.')) {
    return next();
  }
  res.sendFile(path.join(siteDir, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Hallmark server running at http://${HOST}:${PORT}`);
});
