import { Router } from "express";
import {
  postUrl,
  getShortUrl,
  deleteShortUrl,
} from "../controllers/urlController.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

const urlRouter = Router();
urlRouter.post("/urls/shorten", validateTokenMiddleware, postUrl);
urlRouter.get("/urls/:shortUrl", getShortUrl);
urlRouter.delete("/urls/:id", validateTokenMiddleware, deleteShortUrl);
export default urlRouter;
