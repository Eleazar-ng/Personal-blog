
import { BlogService } from "../service/index.js";

export class BlogController {
  static async home(req, res){
    try {
      const articles = await BlogService.getAllArticles();
      const year = BlogService.getCurrentYear();
      res.render('guest/home', { articles, year });
    } catch (error) {
      console.error(error)
      res.status(500).send('Error loading articles');
    }
  }
}