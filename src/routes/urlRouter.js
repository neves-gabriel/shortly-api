import { Router } from "express";
import { postUrl } from "../controllers/urlController.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

const urlRouter = Router();
urlRouter.post("/urls/shorten", validateTokenMiddleware, postUrl);
export default urlRouter;
