
            import * as semesterFeeService from "./semester-fee.service";
            import { createResponse } from "../common/helper/response.hepler";
            import asyncHandler from "express-async-handler";
            import { type Request, type Response } from 'express'

            export const createsemesterFee = asyncHandler(async (req: Request, res: Response) => {
                const result = await semesterFeeService.createsemesterFee(req.body);
                res.send(createResponse(result, "semesterFee created sucssefully"))
            });

            export const updatesemesterFee = asyncHandler(async (req: Request, res: Response) => {
                const result = await semesterFeeService.updatesemesterFee(req.params.id, req.body);
                res.send(createResponse(result, "semesterFee updated sucssefully"))
            });

            export const editsemesterFee = asyncHandler(async (req: Request, res: Response) => {
                const result = await semesterFeeService.editsemesterFee(req.params.id, req.body);
                res.send(createResponse(result, "semesterFee updated sucssefully"))
            });

            export const deletesemesterFee = asyncHandler(async (req: Request, res: Response) => {
                const result = await semesterFeeService.deletesemesterFee(req.params.id);
                res.send(createResponse(result, "semesterFee deleted sucssefully"))
            });


            export const getsemesterFeeById = asyncHandler(async (req: Request, res: Response) => {
                const result = await semesterFeeService.getsemesterFeeById(req.params.id);
                res.send(createResponse(result))
            });


            export const getAllsemesterFee = asyncHandler(async (req: Request, res: Response) => {
                const result = await semesterFeeService.getAllsemesterFee();
                res.send(createResponse(result))
            });
