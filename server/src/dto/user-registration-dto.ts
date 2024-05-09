import { IsEmail, IsNumber, IsString } from "class-validator";
import { User } from "../entity/User";
import { Expose } from "class-transformer";

export default class UserRegistrationDto {
	@IsString()
	firstName: string;

	@IsString()
	lastName: string;

	@IsEmail()
	email: string;

	@IsString()
	carPlate: string;
}

export class StartParkingDto {
	@IsNumber()
	userId: number;

	@IsString()
	parkingArea: string;
}

export class StopParkingDto {
	@IsNumber()
	userId: number;

}

export class UserRegistrationResponseDto {
	@IsNumber()
	@Expose()
	id: number;

	@IsString()
	@Expose()
	firstName: string;

	@IsString()
	@Expose()
	lastName: string;

	@IsEmail()
	@Expose()
	email: string;
}
