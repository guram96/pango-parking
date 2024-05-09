import { City } from "./../entity/City";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User, UserParkingLog } from "../entity/User";
import logger from "./winston";
import ParkingPrice from "../entity/ParkingPrice";

const { DB_TYPE, DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD } =
	process.env;

export const AppDataSource = new DataSource({
	type: DB_TYPE as "postgres",
	host: DB_HOST,
	port: Number(DB_PORT),
	username: DB_USERNAME,
	password: DB_PASSWORD,
	database: DB_NAME,
	synchronize: true,
	logging: false,
	entities: [User, UserParkingLog, City, ParkingPrice],
	migrations: [],
	subscribers: [],
});

AppDataSource.initialize()
	.then(async (db) => {
		// const parkingPrice = new ParkingPrice();
		// const city = new City();

		// parkingPrice.from = "08:00AM";
		// parkingPrice.to = "10:00AM";
		// parkingPrice.price = 5.0;

		// await db.manager.save(parkingPrice);

		// city.name = "New york";
		// city.parkingAreas = ["Brooklyn", "Queens"];
		// city.parkingPrice = [parkingPrice];
		// console.log(city);
		// await db.manager.save(city);

		// const cityRepo = db.getRepository(City);
		// const cities = await cityRepo.find({
		// 	relations: { parkingPriceMap: true },
		// });

		// console.log(cities[0].parkingPriceMap);
		logger.info("Connected to db");
	})
	.catch((error) => logger.error(error));

const DB = AppDataSource.manager;
export default DB;
