import { Router } from "express";
import { createCaptcha } from "../controllers/controller.captcha.js";

const captchaRoute = Router();

captchaRoute.post('/create',createCaptcha);

export default captchaRoute;