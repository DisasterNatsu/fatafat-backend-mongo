import express from "express";
import {
  AdminLogIn,
  AdminRegister,
  AdminTokenVerification,
} from "../controllers/auth/admin/AdminAuth";
import {
  ClientLogIn,
  ClientRegister,
  TokenVerification,
} from "../controllers/auth/client/ClientAuth";

const Router = express.Router();

Router.post("/admin/register", AdminRegister);
Router.post("/admin/log-in", AdminLogIn);
Router.post("/user/register", ClientRegister);
Router.post("/user/log-in", ClientLogIn);
Router.get("/admin/is-auth", AdminTokenVerification);
Router.get("/user/is-auth", TokenVerification);

export default Router;
