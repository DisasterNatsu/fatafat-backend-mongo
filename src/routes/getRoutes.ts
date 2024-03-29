import express from "express";

import {
  getFatafatData,
  getPreviousTenDays,
  getTipsData,
  previousData,
  getPreviousTwoDays
} from "../controllers/client/getFatafatData";

const Router = express.Router();

Router.get("/latest/:date", getFatafatData);
Router.get("/last-ten/:date", getPreviousTenDays);
Router.get("/previous/:date", previousData);
Router.get("/tips/:date", getTipsData);
Router.get("/last-two/:date", getPreviousTwoDays);

export default Router;
