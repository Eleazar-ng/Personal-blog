
import path from "path";
import * as fs from 'fs';
import { fileURLToPath } from 'url';

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

      await fs.readdir(ARTICLES_DIR, (err, files) => {
        if(err) {
          console.error('Error reading directory:', err)
          return;
        }

        if(files.length > 0){
          const parsed = files.map(async(file) => {
            if (file.endsWith('.json')) {
              return await this.parseArticle(file)
            }
          })

          articles = [...parsed]
        }
      });

      if(articles.length > 0){
        return articles.sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate));
      } 
      return articles;
    } catch (error) {
      console.error(error)
      return null
    }
  }

  static async parseArticle(file){
    const content = await fs.readFile(path.join(ARTICLES_DIR, file), 'utf8');
    const parsed = JSON.parse(content);
    return parsed
  }

  static getCurrentYear(){
    const year = new Date().getFullYear();
    return year
  }

  static async saveArticle(article){
    try {
      const filename = path.join(ARTICLES_DIR, `${article.id}.json`);
      await fs.writeFile(filename, JSON.stringify(article, null, 2));
    } catch (error) {
      console.error(error)
      return null
    }
  }
}