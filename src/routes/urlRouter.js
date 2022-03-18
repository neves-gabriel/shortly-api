import { Router } from "express";
import { postUrl, getShortUrl } from "../controllers/urlController.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

const urlRouter = Router();
urlRouter.post("/urls/shorten", validateTokenMiddleware, postUrl);
urlRouter.get("/urls/:shortUrl", getShortUrl);
export default urlRouter;
