import { body } from "express-validator";
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
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  body("duration")
    .notEmpty()
    .withMessage("Duration is required")
    .isInt({ gt: 0 })
    .withMessage("Duration must be a positive integer"),
];

export const updateCourse = [
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
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  body("duration")
    .notEmpty()
    .withMessage("Duration is required")
    .isInt({ gt: 0 })
    .withMessage("Duration must be a positive integer"),
];

export const editCourse = [
  body("name")
  .optional()
  .isString()
  .withMessage("Course name must be a string")
  .custom(async (value) => {
    const isCourseExists = await courseService.getCourseByName(value);
    if (isCourseExists.length) {
      throw new Error("Course already exists");
    }
  }),
body("description")
  .optional()
  .isString()
  .withMessage("Description must be a string"),
body("duration")
  .optional()
  .isInt({ gt: 0 })
  .withMessage("Duration must be a positive integer"),
];
