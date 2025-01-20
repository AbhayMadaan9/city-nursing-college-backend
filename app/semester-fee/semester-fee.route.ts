
        import { Router } from "express";
        import { catchError } from "../common/middleware/cath-error.middleware";
        import * as semesterFeeController from "./semester-fee.controller";
        import * as semesterFeeValidator from "./semester-fee.validation";

        const router = Router();
        
        router
        .get("/", semesterFeeController.getAllsemesterFee)
        .get("/:id", semesterFeeController.getsemesterFeeById)
        .delete("/:id", semesterFeeController.deletesemesterFee)
        .post("/", semesterFeeValidator.createsemesterFee ,catchError, semesterFeeController.createsemesterFee)
        .put("/:id", semesterFeeValidator.updatesemesterFee, catchError, semesterFeeController.updatesemesterFee)
        .patch("/:id", semesterFeeValidator.editsemesterFee, catchError, semesterFeeController.editsemesterFee)

        export default router;
    
    