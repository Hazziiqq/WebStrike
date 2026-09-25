import { Router } from "express";
import { startRecon } from "../controllers/reconController";

const router = Router()

router.post('/', startRecon)

export default router