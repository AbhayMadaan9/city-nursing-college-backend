import * as feesService from "./fees.service";
import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";

export const createFees = asyncHandler(async (req: Request, res: Response) => {
  const result = await feesService.createFees(req.body);
  res.send(createResponse(result, "Fees created sucssefully"));
});

export const updateFees = asyncHandler(async (req: Request, res: Response) => {
  const result = await feesService.updateFees(req.params.id, req.body);
  res.send(createResponse(result, "Fees updated sucssefully"));
});

export const editFees = asyncHandler(async (req: Request, res: Response) => {
  const result = await feesService.editFees(req.params.id, req.body);
  res.send(createResponse(result, "Fees updated sucssefully"));
});

export const deleteFees = asyncHandler(async (req: Request, res: Response) => {
  const result = await feesService.deleteFees(req.params.id);
  res.send(createResponse(result, "Fees deleted sucssefully"));
});

export const getFeesById = asyncHandler(async (req: Request, res: Response) => {
  const result = await feesService.getFeesById(req.params.id);
  res.send(createResponse(result));
});

export const getAllFees = asyncHandler(async (req: Request, res: Response) => {
  const result = await feesService.getAllFees();
  res.send(createResponse(result));
});
