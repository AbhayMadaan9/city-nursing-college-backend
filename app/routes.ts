import express from "express";
import authRoutes from "./auth/auth.route";
import courseRoutes from "./course/course.route";
import studentRoutes from "./student/student.route";
import { roleAuth } from "./common/middleware/role-auth.middleware";
import { UserType } from "./user/user.dto";
// routes
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/course", roleAuth(UserType.ADMIN), courseRoutes);
router.use("/student", roleAuth(UserType.ADMIN), studentRoutes);

export default router;
