import express from "express";

import {
  getFatafatData,
  getPreviousTenDays,
  getTipsData,
  previousData,
  getPreviousTwoDays,
  getPattiTips,
  getRepeatPatti,
} from "../controllers/client/getFatafatData";

const Router = express.Router();

Router.get("/latest/:date", getFatafatData);
Router.get("/last-ten/:date", getPreviousTenDays);
Router.get("/previous/:date", previousData);
Router.get("/tips/:date", getTipsData);
Router.get("/last-two/:date", getPreviousTwoDays);
Router.get("/patti-tips/:date", getPattiTips);
Router.get("/repeat-patti", getRepeatPatti);

export default Router;
