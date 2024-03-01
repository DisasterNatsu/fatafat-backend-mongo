import express from "express";

import {
  getFatafatData,
  getPreviousTenDays,
  getTipsData,
} from "../controllers/client/getFatafatData";

const Router = express.Router();

Router.get("/latest/:date", getFatafatData);
Router.get("/last-ten/:date", getPreviousTenDays);
Router.get("/previous/:date", getPreviousTenDays);
Router.get("/tips/:date", getTipsData);

export default Router;
