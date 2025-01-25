import * as semesterFeeService from "./semester-fee.service";
import * as courseService from "../course/course.service";
import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";
import { CourseStatus } from "../course/course.dto";
import { Types } from "mongoose";

export const validateSemesterFeeRequest = async (req: Request) => {
  const { id: semesterId } = req.params;
  const { course: courseId, semesterNumber } = req.body;

  // If semesterId exists, fetch the semester
  const existingSemester = semesterId
    ? await semesterFeeService.getsemesterFeeById(semesterId)
    : null;

  // Determine the courseId from the existingSemester or request body
  const associatedCourseId = existingSemester?.course || courseId;

  // Fetch the course with semesters

  const course = await courseService.getCourseByIdWithSemesters(
    associatedCourseId as string,
  );
  if (!course) {
    throw new Error("Associated course not found");
  }

  // Check semester number
  const semesterNumberForComp = existingSemester
    ? existingSemester.semesterNumber
    : semesterNumber;
  if (course.duration < semesterNumberForComp) {
    throw new Error(
      `Semester number ${semesterNumberForComp} exceeds the course duration of ${course.duration}`,
    );
  }
  // Check course status
  if (course.status === CourseStatus.COMPLETED) {
    throw new Error("Course has already been completed. Operation not allowed");
  }

  // Check if semesterNumber already exists for the course
  if (semesterNumber) {
    const isSemesterExists = course.semesters.some(
      (semester) => semester.semesterNumber === semesterNumber,
    );
    if (isSemesterExists) {
      throw new Error(
        `Semester ${semesterNumber} already exists for course ${course.name}`,
      );
    }
  }

  return { course, existingSemester };
};

export const createsemesterFee = asyncHandler(
  async (req: Request, res: Response) => {
    // Validate the request
    const { course: validatedCourse } = await validateSemesterFeeRequest(req);

    // Create the new semester fee
    const newSemesterFee = await semesterFeeService.createsemesterFee(req.body);

    // Update the course with the new semesters list
    validatedCourse.semesters.push(newSemesterFee);
    const updatedCourse = await courseService.editCourse(validatedCourse._id, {
      semesters: validatedCourse.semesters.map(
        (semester) => new Types.ObjectId(semester._id),
      ),
    });
    if (!updatedCourse) {
      throw new Error("Failed to update course");
    }
    // Check and update course status if needed
    if (updatedCourse.semesters.length === validatedCourse.duration) {
      await courseService.editCourse(validatedCourse._id, {
        status: CourseStatus.COMPLETED,
      });
    }

    res.send(
      createResponse(newSemesterFee, "Semester fee created successfully"),
    );
  },
);

export const updatesemesterFee = asyncHandler(
  async (req: Request, res: Response) => {
    const { existingSemester } = await validateSemesterFeeRequest(req);

    // Perform the update
    if (!existingSemester) {
      throw new Error("Semester fee not found");
    }
    const result = await semesterFeeService.updatesemesterFee(
      existingSemester._id,
      req.body,
    );

    res.send(createResponse(result, "Semester fee updated successfully"));
  },
);

export const editsemesterFee = asyncHandler(
  async (req: Request, res: Response) => {
    const { existingSemester } = await validateSemesterFeeRequest(req);

    if (!existingSemester) {
      throw new Error("Semester fee not found");
    }

    // Perform the edit
    const result = await semesterFeeService.editsemesterFee(
      existingSemester._id,
      req.body,
    );

    res.send(createResponse(result, "Semester fee updated successfully"));
  },
);

export const deletesemesterFee = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await semesterFeeService.deletesemesterFee(req.params.id);
    res.send(createResponse(result, "semesterFee deleted sucssefully"));
  },
);

export const getsemesterFeeById = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await semesterFeeService.getsemesterFeeById(req.params.id);
    res.send(createResponse(result));
  },
);

export const getAllsemesterFee = asyncHandler(
  async (req: Request, res: Response) => {
    const courseId = req.query.course as string;
    const result = await semesterFeeService.getAllsemesterFee(courseId);
    res.send(createResponse(result));
  },
);
