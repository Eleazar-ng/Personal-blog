
import { ADMIN_PASSWORD, ADMIN_USERNAME } from "../config/auth.js";
import { BlogService } from "../service/index.js";
import { v4 as uuidv4 } from 'uuid';

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
        req.session.isAuthenticated = true;
        res.redirect("/admin");
      } else {
        res.render('admin/login', { error: 'Invalid login credentials!', year });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error processing login request')
    }
  }

  static async dashboard(req,res){
    try {
      const articles = await BlogService.getAllArticles();
      const year = BlogService.getCurrentYear();
      res.render('admin/dashboard', { articles, year });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error loading dashboard');
    }
  }

  static async addArticlePage(req, res){
    try {
      const year = BlogService.getCurrentYear();
      res.render("admin/new", { year })
    } catch (error) {
      console.error(error);
      res.status(500).send('Error loading add new article page')
    }
  }

  static async addArticle(req, res){
    try {
      const {title, publicationDate, content} = req.body;
      const article = {
        id: uuidv4(),
        title,
        publicationDate: publicationDate || new Date().toISOString().split('T')[0],
        createdAt: new Date(),
        content
      }
      await BlogService.saveArticle(article);
      res.redirect("/admin");
    } catch (error) {
      console.error(error);
      res.status(500).send('Error processing new article request');
    }
  }
}