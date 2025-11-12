
import path from "path";
import { promises as fs } from "fs";
import { fileURLToPath } from 'url';
import { months } from "../config/constant.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __rootDirname = path.dirname(__dirname);

// Data directory
const DATA_DIR = path.join(__rootDirname, 'data');
const ARTICLES_DIR = path.join(DATA_DIR, 'articles');

export class BlogService {
  static async getAllArticles(){
    try {
      let articles = [];
      const data = await fs.readdir(ARTICLES_DIR);
      if(data.length > 0){
        for ( const file of data ){
          if(file.endsWith('.json')){
            const parsedFile = await this.parseArticle(file);
            if(parsedFile){
              const date = new Date(parsedFile.publicationDate);
              const day = date.getDate();
              const month = months[date.getMonth()];
              const year = date.getFullYear()
              const formattedDate = `${month} ${day}, ${year}`
              parsedFile['formattedDate'] = formattedDate
              articles.push(parsedFile);
            }
          }
        }
      }

      if(articles.length > 0){
        return articles.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } 
      return articles;
    } catch (error) {
      console.error(error)
      return []
    }
  }

  static async parseArticle(file){
    try {
      const data = await fs.readFile(path.join(ARTICLES_DIR, file), 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error(error)
      return null
    }
  }

  static getCurrentYear(){
    const year = new Date().getFullYear();
    return year
  }

  static async saveArticle(article){
    try {
      const filename = path.join(ARTICLES_DIR, `${article.id}.json`);
      await fs.writeFile(filename, JSON.stringify(article, null, 2), (err) => {
        if (err) {
          console.error('Error writing file:', err);
          return;
        }
      });
      return true;
    } catch (error) {
      console.error(error)
      return null
    }
  }
}