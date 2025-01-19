import * as studentService from "./student.service";
import * as courseService from "../course/course.service";
import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";
import { getPaginationOptions } from "../common/helper/util.helper";

export const createStudent = asyncHandler(
  async (req: Request, res: Response) => {
    const course = await courseService.getCourseById(req.body.course);
    if (!course) {
      throw new Error("Course not found");
    }
    const studentCourseFee = course.fees.find(
      (fee) => fee.cast === req.body.category,
    );
    if (!studentCourseFee) {
      throw new Error("Fees not found for this category");
    }
    const studentCourseFeeAmount = studentCourseFee.fees.reduce(
      (acc, fee) => acc + fee.amount,
      0,
    );
    if (studentCourseFeeAmount < req.body.feesDiscount) {
      throw new Error("Discount amount is greater than course fees");
    }
    req.body.netFees = studentCourseFeeAmount - req.body.feesDiscount;
    const result = await studentService.createStudent(req.body);
    res.send(createResponse(result, "Student created sucssefully"));
  },
);

export const updateStudent = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await studentService.updateStudent(req.params.id, req.body);
    res.send(createResponse(result, "Student updated sucssefully"));
  },
);

export const editStudent = asyncHandler(async (req: Request, res: Response) => {
  const result = await studentService.editStudent(req.params.id, req.body);
  res.send(createResponse(result, "Student updated sucssefully"));
});

export const deleteStudent = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await studentService.deleteStudent(req.params.id);
    res.send(createResponse(result, "Student deleted sucssefully"));
  },
);

export const getStudentById = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await studentService.getStudentById(req.params.id);
    res.send(createResponse(result));
  },
);

export const getAllStudent = asyncHandler(
  async (req: Request, res: Response) => {
    const paginationOptions = getPaginationOptions(req.query);
    const result = await studentService.getAllStudent(paginationOptions);
    res.send(createResponse(result));
  },
);
