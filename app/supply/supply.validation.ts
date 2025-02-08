import { body, param } from "express-validator";

export const createSupply = [
    body("student")
     .notEmpty()
     .withMessage("Student is required")
     .isMongoId()
     .withMessage("Student must be a valid MongoId"),
    body("semester")
     .notEmpty()
     .withMessage("Semester is required")
     .isMongoId()
     .withMessage("Semester must be a valid MongoId"),
    body("amount")
     .notEmpty()
     .withMessage("Amount is required")
     .isNumeric()
     .withMessage("Amount must be a number"),
    body("subject")
     .notEmpty()
     .withMessage("Subject is required")
     .isString()
     .withMessage("Subject must be a string"),
    body("supplyNumber")
     .notEmpty()
     .withMessage("Supply Number is required")
     .isNumeric()
     .withMessage("Supply Number must be a number"),
];

export const totalSupply = [
    param("student")
     .notEmpty()
     .withMessage("Student is required")
     .isMongoId()
     .withMessage("Student must be a valid MongoId"),
    param("semester")
     .notEmpty()
     .withMessage("Semester is required")
     .isMongoId()
     .withMessage("Semester must be a valid MongoId"),
    param("subject")
     .notEmpty()
     .withMessage("Subject is required")
     .isString()
     .withMessage("Subject must be a string"),
];