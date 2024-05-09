import express from "express";
import UserRegistrationDto from "../dto/user-registration-dto";
import UserRepository from "../repository/user-repository";
import {
	internalServerErrorResponse,
	successResponse,
} from "../shared/http-responses";
import { transformAndValidateDto } from "../shared/middlewares";
import CityRepository from "../repository/city-repository";

const cityRoutes = express.Router();

const cityRepository = new CityRepository();

cityRoutes.get("/all", async (req, res) => {
	try {
		const cities = await cityRepository.findCities();
		successResponse(res, cities);
	} catch (err) {
		internalServerErrorResponse(res, err.message);
	}
});

export default cityRoutes;
