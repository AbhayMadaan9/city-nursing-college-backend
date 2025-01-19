import { body } from "express-validator";
import * as courseService from "../course/course.service";
import * as studentService from "./student.service";
import { Caste } from "../course/course.dto";
export const createStudent = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),

  body("motherName")
    .notEmpty()
    .withMessage("Mother Name is required")
    .isString()
    .withMessage("Mother Name must be a string"),
  body("fatherName")
    .notEmpty()
    .withMessage("Father Name is required")
    .isString()
    .withMessage("Father Name must be a string"),
  body("serialNumber")
    .notEmpty()
    .withMessage("Serial Number is required")
    .isString()
    .withMessage("Serial Number must be a string")
    .custom(async (value) => {
      const student = await studentService.getStudentBySerialNumber(value);
      console.log("student: ", student);
      if (student) {
        throw new Error(`Student with ${value} serial number already exists`);
      }
    }),
  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isIn(Object.values(Caste))
    .withMessage(`Category must be in ${Object.values(Caste).join(", ")}`),
  body("registrationNumber")
    .notEmpty()
    .withMessage("Registration Number is required")
    .isString()
    .withMessage("Registration Number must be a string")
    .custom(async (value) => {
      const student =
        await studentService.getStudentByRegistrationNumber(value);
      if (student) {
        throw new Error(
          `Student with ${value} registration number already exists`,
        );
      }
    }),
  body("course")
    .notEmpty()
    .withMessage("Course is required")
    .isMongoId()
    .withMessage("Course must be a valid mongodb Id")
    .custom(async (value) => {
      const course = await courseService.getCourseById(value);
      if (!course) {
        throw new Error("Course not found");
      }
    }),
  body("aadharNo")
    .notEmpty()
    .withMessage("Aadhar Number is required")
    .isString()
    .withMessage("Aadhar Number must be a valid")
    .matches(/^\d{12}$/)
    .withMessage("Aadhaar number must be exactly 12 digits")
    .custom(async (value) => {
      const student = await studentService.getStudentByAadharNumber(value);
      if (student) {
        throw new Error(`Student with ${value} aadhar number already exists`);
      }
    }),
  body("contactNo")
    .notEmpty()
    .withMessage("Phone is required")
    .isMobilePhone("en-IN")
    .withMessage("Phone must be a valid phone number"),
  body("address")
    .notEmpty()
    .withMessage("Address is required")
    .isString()
    .withMessage("Address must be a string"),
  body("dob")
    .notEmpty()
    .withMessage("Date of birth is required")
    .isISO8601()
    .withMessage("Date of birth must be a valid date"),
];

export const updateStudent = [];

export const editStudent = [];
