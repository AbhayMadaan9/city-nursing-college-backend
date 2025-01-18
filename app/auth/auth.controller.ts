import * as authService from "./auth.service";
import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";

export const createAuth = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.createAuth(req.body);
  res.send(createResponse(result, "Auth created sucssefully"));
});

export const updateAuth = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.updateAuth(req.params.id, req.body);
  res.send(createResponse(result, "Auth updated sucssefully"));
});

export const editAuth = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.editAuth(req.params.id, req.body);
  res.send(createResponse(result, "Auth updated sucssefully"));
});

export const deleteAuth = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.deleteAuth(req.params.id);
  res.send(createResponse(result, "Auth deleted sucssefully"));
});

export const getAuthById = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.getAuthById(req.params.id);
  res.send(createResponse(result));
});

export const getAllAuth = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.getAllAuth();
  res.send(createResponse(result));
});
