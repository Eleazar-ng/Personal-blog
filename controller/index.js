
import { ADMIN_PASSWORD, ADMIN_USERNAME } from "../config/auth.js";
import { BlogService } from "../service/index.js";

export class BlogController {
  //Guest
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
  

  //Admin 
  static async loginPage(req, res){
    try {
      const year = BlogService.getCurrentYear();
      res.render("admin/login", { error: null, year })
    } catch (error) {
      console.error(error);
      res.status(500).send('Error loading login page')
    }
  }

  static async login(req, res){
    try {
      const year = BlogService.getCurrentYear();
      const { username, password } = req.body;
      if(username === ADMIN_USERNAME && password === ADMIN_PASSWORD){

      } else {
        res.render('admin/login', { error: 'Invalid login credentials!', year });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error processing login request')
    }
  }
}