
import path from "path";
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import express from "express";
import { Routers } from "./route/index.js";

const app = express();
const PORT = process.env.PORT || 8087;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Middleware
app.use(express.static('public'));

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(Routers)

//Start server
app.listen(PORT, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`Blog server running on http://localhost:${PORT}`);
})
