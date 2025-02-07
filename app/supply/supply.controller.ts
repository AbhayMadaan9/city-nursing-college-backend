import * as supplyService from "./supply.service";
import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";

export const createSupply = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await supplyService.createSupply(req.body);
    res.send(createResponse(result, "Supply created sucssefully"));
  },
);

export const updateSupply = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await supplyService.updateSupply(req.params.id, req.body);
    res.send(createResponse(result, "Supply updated sucssefully"));
  },
);

export const editSupply = asyncHandler(async (req: Request, res: Response) => {
  const result = await supplyService.editSupply(req.params.id, req.body);
  res.send(createResponse(result, "Supply updated sucssefully"));
});

export const deleteSupply = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await supplyService.deleteSupply(req.params.id);
    res.send(createResponse(result, "Supply deleted sucssefully"));
  },
);

export const getSupplyById = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await supplyService.getSupplyById(req.params.id);
    res.send(createResponse(result));
  },
);

export const getAllSupply = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await supplyService.getAllSupply();
    res.send(createResponse(result));
  },
);
