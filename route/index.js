
import express from "express";
import { BlogController } from "../controller/index.js";

const route = express.Router();

//Guest routes
route.get("/", BlogController.home)
// route.get("/article/:id")

export { route as Routers }