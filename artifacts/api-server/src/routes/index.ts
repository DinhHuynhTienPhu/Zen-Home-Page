import { Router, type IRouter } from "express";
import goodNewsRouter from "./good-news";
import healthRouter from "./health";

const router: IRouter = Router();

router.use(healthRouter);
router.use(goodNewsRouter);

export default router;
