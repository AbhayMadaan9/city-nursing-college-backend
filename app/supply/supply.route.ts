import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as supplyController from "./supply.controller";
import * as supplyValidator from "./supply.validation";

const router = Router();

router
  .get("/", supplyController.getAllSupply)
  .get("/:id", supplyController.getSupplyById)
  .delete("/:id", supplyController.deleteSupply)
  .post(
    "/",
    supplyValidator.createSupply,
    catchError,
    supplyController.createSupply,
  )
  .put(
    "/:id",
    supplyValidator.updateSupply,
    catchError,
    supplyController.updateSupply,
  )
  .patch(
    "/:id",
    supplyValidator.editSupply,
    catchError,
    supplyController.editSupply,
  );

export default router;
