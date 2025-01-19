import * as studentService from "./student.service";
import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";
import { getPaginationOptions } from "../common/helper/util.helper";

export const createStudent = asyncHandler(
  async (req: Request, res: Response) => {
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
