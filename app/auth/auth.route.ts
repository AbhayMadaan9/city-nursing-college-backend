import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as authController from "./auth.controller";
import * as authValidator from "./auth.validation";

const router = Router();

router
  .post("/", authValidator.createAuth, catchError, authController.createAuth)

export default router;
