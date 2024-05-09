import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import type { NextFunction, Request, Response } from "express";
import { badRequestResponse } from "./http-responses";
import logger from "./winston";

/**
 * Transform and validate request data
 * TODO: add ability to transform and validate params and query
 * @date 03/05/2024
 * @export
 * @param {Class} dto class representing data shape
 * @return {Error | NextFunction}
 */
export function transformAndValidateDto(dto) {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const dtoInstance = plainToInstance(dto, req.body);
			const errors = await validate(dtoInstance);
			if (errors.length) {
				logger.error("validation failed");
				badRequestResponse(res, errors);
			} else {
				req.body.dto = dtoInstance;
				next();
			}
		} catch (err) {
			res.send(err).status(500);
		}
	};
}
