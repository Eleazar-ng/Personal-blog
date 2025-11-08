
import { BlogService } from "../service/index.js";

export class BlogController {
  static async home(req, res){
    try {
      const articles = await BlogService.getAll();
      res.render('guest/home', { articles });
    } catch (error) {
      console.error(error)
      res.status(500).send('Error loading articles');
    }
  }
}