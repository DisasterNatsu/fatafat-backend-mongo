import express from "express";
import {
  deleteFromResults,
  postBajiTips,
  postFatafatdata,
  postPattiTips,
} from "../controllers/admin/postFatafatData";
import { isAdminAuth } from "../middlewares/admin/isAdminAuth";

const Router = express.Router();

Router.post("/add-new", isAdminAuth, postFatafatdata);
Router.post("/add-tips", isAdminAuth, postBajiTips);
Router.post("/add-patti-tips", isAdminAuth, postPattiTips);
Router.post("/delete-result", isAdminAuth, deleteFromResults);

export default Router;
