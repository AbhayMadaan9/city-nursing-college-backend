import * as courseService from "./course.service";
import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";
import { getPaginationOptions } from "../common/helper/util.helper";

export const createCourse = asyncHandler(
  async (req: Request, res: Response) => {
    console.log("req.body: ", req.body);
    const result = await courseService.createCourse(req.body);
    res.send(createResponse(result, "Course created sucssefully"));
  },
);

export const updateCourse = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await courseService.updateCourse(req.params.id, req.body);
    res.send(createResponse(result, "Course updated sucssefully"));
  },
);

export const editCourse = asyncHandler(async (req: Request, res: Response) => {
  const result = await courseService.editCourse(req.params.id, req.body);
  res.send(createResponse(result, "Course updated sucssefully"));
});

export const deleteCourse = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await courseService.deleteCourse(req.params.id);
    res.send(createResponse(result, "Course deleted sucssefully"));
  },
);

export const getCourseById = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await courseService.getCourseById(req.params.id);
    res.send(createResponse(result));
  },
);

export const getAllCourse = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await courseService.getAllCourse();
    res.send(createResponse(result));
  },
);
