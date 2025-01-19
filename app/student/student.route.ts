import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as studentController from "./student.controller";
import * as studentValidator from "./student.validation";

const router = Router();

router
  .get("/", studentController.getAllStudent)
  .get("/:id", studentController.getStudentById)
  .delete("/:id", studentController.deleteStudent)
  .post(
    "/",
    studentValidator.createStudent,
    catchError,
    studentController.createStudent,
  )
  .put(
    "/:id",
    studentValidator.updateStudent,
    catchError,
    studentController.updateStudent,
  )
  .patch(
    "/:id",
    studentValidator.editStudent,
    catchError,
    studentController.editStudent,
  );

export default router;
