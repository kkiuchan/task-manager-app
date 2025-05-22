import { Router } from "express";
import categoryRoutes from "./categoryRoutes";
import taskRoutes from "./taskRoutes";

const router = Router();

router.use("/tasks", taskRoutes);
router.use("/categories", categoryRoutes);

export default router;
