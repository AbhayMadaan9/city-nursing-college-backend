import { check } from "express-validator";

export const getDocuments = [
  check("page").optional().isNumeric().withMessage("Page must be a number"),
  check("limit").optional().isNumeric().withMessage("Limit must be a number"),
];
