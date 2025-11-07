
import path from "path";
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import express from "express";

const app = express();
const PORT = process.env.PORT || 8087;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');

// Data directory
const DATA_DIR = path.join(__dirname, 'data');
const ARTICLES_DIR = path.join(DATA_DIR, 'articles');

//Start server
app.listen(PORT, () => {
  console.log(`Blog server running on http://localhost:${PORT}`);
})
