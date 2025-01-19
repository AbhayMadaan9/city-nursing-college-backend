import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as feesController from "./fees.controller";
import * as feesValidator from "./fees.validation";

const router = Router();

router
  .get("/", feesController.getAllFees)
  .get("/:id", feesController.getFeesById)
  .delete("/:id", feesController.deleteFees)
  .post("/", feesValidator.createFees, catchError, feesController.createFees)
  .put("/:id", feesValidator.updateFees, catchError, feesController.updateFees)
  .patch("/:id", feesValidator.editFees, catchError, feesController.editFees);

export default router;
