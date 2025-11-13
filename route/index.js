
import express from "express";
import { BlogController } from "../controller/index.js";
import { isAuthenticated } from "../middleware/auth.js";

const route = express.Router();

//Guest routes
route.get("/", BlogController.home);
route.get("/home", BlogController.home);

route.get("/article/:id", BlogController.article);

//Admin routes
route.get("/login", BlogController.loginPage);
route.post("/login", BlogController.login);

route.get("/admin",isAuthenticated, BlogController.dashboard);

route.get("/new", isAuthenticated, BlogController.addArticlePage);
route.post("/new", isAuthenticated, BlogController.addArticle);


export { route as Routers }