import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as supplyController from "./supply.controller";
import * as supplyValidator from "./supply.validation";

const router = Router();

router
  .get("/", supplyController.getAllSupply)
  .get("/:id", supplyController.getSupplyById)
  .get("/total",supplyValidator.totalSupply,catchError, supplyController.getSupplyCountOfStudentSubject)
  // .delete("/:id", supplyController.deleteSupply)
  .post(
    "/",
    supplyValidator.createSupply,
    catchError,
    supplyController.createSupply,
  )

export default router;
