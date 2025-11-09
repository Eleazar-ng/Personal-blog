
import express from "express";
import { BlogController } from "../controller/index.js";

const route = express.Router();

//Guest routes
route.get("/", BlogController.home)
// route.get("/article/:id")

//Admin routes
route.get("/admin/login", BlogController.loginPage)
route.post("/admin/login", BlogController.login)

export { route as Routers }