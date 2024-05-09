import { City } from "../entity/City";
import DB from "../shared/db";

export default class CityRepository {
	cityRepository = DB.getRepository(City);

	async findCities(): Promise<City[]> {
		const cities = await this.cityRepository.find({
			relations: { parkingPrice: true },
		});

		return cities;
	}
}
