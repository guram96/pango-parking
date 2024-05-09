import { scrypt, randomBytes } from "node:crypto";
import type UserRegistrationDto from "../dto/user-registration-dto";
import { User, UserParkingLog } from "../entity/User";
import DB from "../shared/db";
import logger from "../shared/winston";
import { UserRegistrationResponseDto } from "../dto/user-registration-dto";
import { plainToInstance } from "class-transformer";

export default class UserRepository {
	userRepository = DB.getRepository(User);
	userParkingLogRepository = DB.getRepository(UserParkingLog);

	async create({
		firstName,
		lastName,
		email,
		carPlate,
	}: UserRegistrationDto): Promise<UserRegistrationResponseDto> {
		let encryptedCarPlate: string;

		try {
			encryptedCarPlate = await this.encryptPassword(carPlate);
		} catch (error) {
			logger.error(error);
			throw new Error("Something went wrong when creating a user");
		}

		const user = this.userRepository.create({
			firstName,
			lastName,
			email,
			carPlate: encryptedCarPlate,
		});

		try {
			await this.userRepository.insert(user);
			return plainToInstance(UserRegistrationResponseDto, user, {
				excludeExtraneousValues: true,
			});
		} catch (error) {
			logger.error(error);
			throw new Error("Something went wrong when creating a user");
		}
	}

	async login(
		email: string,
		carPlate: string,
	): Promise<UserRegistrationResponseDto> {
		try {
			const user = await this.userRepository.findOneBy({ email: email });

			if (!user) throw new Error("Email or Password incorrect!");

			if (!(await this.verifyPassword(carPlate, user.carPlate)))
				throw new Error("Email or Password incorrect!");
			return plainToInstance(UserRegistrationResponseDto, user, {
				excludeExtraneousValues: true,
			});
		} catch (error) {
			logger.error(error);
			throw new Error("Email or Password incorrect!");
		}
	}

	async getUserParkingLogs(userId: number) {
		try {
			const parkingLogs = await this.userParkingLogRepository
				.createQueryBuilder("user_parking_log")
				.where("user_parking_log.userId = :id", { id: userId })
				.getMany();
			return parkingLogs;
		} catch (error) {
			logger.error(error);
			throw new Error("Something went wrong!");
		}
	}

	async startParking(userId: number, parkingArea: string) {
		try {
			const user = await this.userRepository.findOneBy({ id: userId });

			if (!user) throw new Error("Something went wrong!");

			const parkingLog = new UserParkingLog();

			parkingLog.isParked = true;
			parkingLog.parkedOnSpace = parkingArea;
			parkingLog.startTime = new Date();
			parkingLog.user = user;

			// TODO: add city and parking area lookup and price!!!!
			await this.userParkingLogRepository.insert(parkingLog);

			return parkingLog;
		} catch (error) {
			logger.error(error);
			throw new Error("Something went wrong!");
		}
	}
	async stopParking(userId: number) {
		try {
			const user = await this.userRepository.findOneBy({ id: userId });

			if (!user) throw new Error("Something went wrong!");

			const parkingLog = await this.userParkingLogRepository
									.createQueryBuilder("user_parking_log")
									.where("user_parking_log.userId = :id", { id: userId }).andWhere("user_parking_log.isParked = True").getOne();

			if (!parkingLog) throw new Error("Something went wrong!");

			parkingLog.isParked = false;
			parkingLog.endTime = new Date();

			await this.userParkingLogRepository.save(parkingLog);

			return parkingLog;
		} catch (error) {
			logger.error(error);
			throw new Error("Something went wrong!");
		}
	}

	private encryptPassword(password: string): Promise<string> {
		return new Promise((resolve, reject) => {
			// generate random 16 bytes long salt
			const salt = randomBytes(16).toString("hex");
			scrypt(password, salt, 64, { N: 1024 }, (err, derivedKey) => {
				if (err) reject(err);
				resolve(`${salt}:${derivedKey.toString("hex")}`);
			});
		});
	}

	private verifyPassword(password: string, hash: string): Promise<boolean> {
		return new Promise((resolve, reject) => {
			const [salt, key] = hash.split(":");

			scrypt(password, salt, 64, { N: 1024 }, (err, derivedKey) => {
				if (err) reject(err);
				resolve(key === derivedKey.toString("hex"));
			});
		});
	}
}
