import express from "express";
import UserRegistrationDto, {
	StartParkingDto,
	StopParkingDto,
} from "../dto/user-registration-dto";
import UserRepository from "../repository/user-repository";
import {
	internalServerErrorResponse,
	successResponse,
} from "../shared/http-responses";
import { transformAndValidateDto } from "../shared/middlewares";

const userRoutes = express.Router();

const userRepository = new UserRepository();

// TODO: add city controller
// TODO: add DTO class
userRoutes.post(
	"/login",
	// transformAndValidateDto(UserRegistrationDto),
	async (req, res) => {
		// const registrationDto = req.body.dto as UserRegistrationDto;
		try {
			const user = await userRepository.login(
				req.body.email,
				req.body.carPlate,
			);
			successResponse(res, user);
		} catch (err) {
			internalServerErrorResponse(res, err.message);
		}
	},
);

userRoutes.post(
	"/register",
	transformAndValidateDto(UserRegistrationDto),
	async (req, res) => {
		const registrationDto = req.body.dto as UserRegistrationDto;
		try {
			const user = await userRepository.create(registrationDto);
			successResponse(res, user);
		} catch (err) {
			internalServerErrorResponse(res, err.message);
		}
	},
);

userRoutes.post(
	"/start-parking",
	transformAndValidateDto(StartParkingDto),
	async (req, res) => {
		const parkingDto = req.body.dto as StartParkingDto;
		try {
			const parkingLog = await userRepository.startParking(
				parkingDto.userId,
				parkingDto.parkingArea,
			);
			successResponse(res, parkingLog);
		} catch (err) {
			internalServerErrorResponse(res, err.message);
		}
	},
);

userRoutes.post(
	"/stop-parking",
	transformAndValidateDto(StopParkingDto),
	async (req, res) => {
		// TODO: add another dto
		const parkingDto = req.body.dto as StopParkingDto;
		try {
			const parkingLog = await userRepository.stopParking(
				parkingDto.userId,
			);
			successResponse(res, parkingLog);
		} catch (err) {
			internalServerErrorResponse(res, err.message);
		}
	},
);

userRoutes.get("/parking-logs/:userId", async (req, res) => {
	try {
		const parkingLogs = await userRepository.getUserParkingLogs(
			Number(req.params.userId),
		);
		successResponse(res, parkingLogs);
	} catch (err) {
		internalServerErrorResponse(res, err.message);
	}
});

export default userRoutes;
