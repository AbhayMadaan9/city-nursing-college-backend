import { body } from "express-validator";
import { Caste, Ifees } from "./course.dto";
import * as courseService from "../course/course.service";
export const createCourse = [
  body("name")
    .notEmpty()
    .withMessage("Course name is required")
    .isString()
    .withMessage("Course name must be a string")
    .custom(async (value) => {
      const isCourseExists = await courseService.getCourseByName(value);
      if (isCourseExists.length) {
        throw new Error("Course already exists");
      }
    }),
  body("duration")
    .notEmpty()
    .withMessage("Duration is required")
    .isInt({ gt: 0 })
    .withMessage("Duration must be a positive integer"),
  body("fees")
    .isObject()
    .withMessage("Fees must be an object")
    .custom((fees) => {
      if (!fees.cast) {
        throw new Error("Fees object must contain a 'cast' field");
      }
      if (!Object.values(Caste).includes(fees.cast)) {
        throw new Error(`Invalid cast value in fees object: ${fees.cast}`);
      }
      if (!Array.isArray(fees.fees) || fees.fees.length === 0) {
        throw new Error("Fees object must contain a non-empty 'fees' array");
      }
      fees.fees.forEach((fee: Ifees, index: number) => {
        if (!fee.type || typeof fee.type !== "string") {
          throw new Error(
            `Fee at index ${index} must have a valid 'type' field`,
          );
        }
        if (typeof fee.amount !== "number" || fee.amount <= 0) {
          throw new Error(
            `Fee at index ${index} must have a positive 'amount' field`,
          );
        }
      });
      return true;
    }),
];

export const updateCourse = [];

export const editCourse = [];
