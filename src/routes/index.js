import { Router } from "express";
import authRouter from "./authRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.get("/health", async (req, res) => {
  res.sendStatus(200);
});

router.use(authRouter);
router.use(userRouter);

export default router;
