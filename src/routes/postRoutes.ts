import express from "express";
import {
  postBajiTips,
  postFatafatdata,
} from "../controllers/admin/postFatafatData";
import { isAdminAuth } from "../middlewares/admin/isAdminAuth";

const Router = express.Router();

Router.post("/add-new", isAdminAuth, postFatafatdata);
Router.post("/add-tips", isAdminAuth, postBajiTips);

export default Router;
