import express from "express";
import {
  AdminLogIn,
  AdminRegister,
  AdminTokenVerification,
  GeneratedData,
} from "../controllers/auth/admin/AdminAuth";
import {
  ClientLogIn,
  ClientRegister,
  TokenVerification,
} from "../controllers/auth/client/ClientAuth";
import { isAdminAuth } from "../middlewares/admin/isAdminAuth";

const Router = express.Router();

Router.post("/admin/register", AdminRegister);
Router.post("/admin/log-in", AdminLogIn);
Router.post("/user/register", ClientRegister);
Router.post("/user/log-in", ClientLogIn);
Router.get("/admin/is-auth", AdminTokenVerification);
Router.get("/admin/generated-data/:date", isAdminAuth, GeneratedData);
Router.get("/user/is-auth", TokenVerification);

export default Router;
