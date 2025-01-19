import { body } from "express-validator";
import { Caste, Ifees, IfeeStructure } from "./course.dto";
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
    .isArray({ min: 1 })
    .withMessage("Fees must be a non-empty array")
    .custom((fees: IfeeStructure[]) => {
      const castSet = new Set();

      fees.forEach((feeStructure: IfeeStructure, index: number) => {
        if (
          !feeStructure.cast ||
          !Object.values(Caste).includes(feeStructure.cast)
        ) {
          throw new Error(
            `Invalid or missing 'cast' value at index ${index} in fees array`,
          );
        }

        if (castSet.has(feeStructure.cast)) {
          throw new Error(
            `Duplicate 'cast' value found in fees array at index ${index}: ${feeStructure.cast}`,
          );
        }

        castSet.add(feeStructure.cast);

        if (
          !Array.isArray(feeStructure.fees) ||
          feeStructure.fees.length === 0
        ) {
          throw new Error(
            `Fees array at index ${index} must contain a non-empty 'fees' array`,
          );
        }

        feeStructure.fees.forEach((fee: Ifees, feeIndex: number) => {
          if (!fee.type || typeof fee.type !== "string") {
            throw new Error(
              `Fee at index ${feeIndex} in 'fees' array at index ${index} must have a valid 'type' field`,
            );
          }
          if (typeof fee.amount !== "number" || fee.amount <= 0) {
            throw new Error(
              `Fee at index ${feeIndex} in 'fees' array at index ${index} must have a positive 'amount' field`,
            );
          }
        });
      });

      return true;
    }),
];

export const updateCourse = [];

export const editCourse = [];
