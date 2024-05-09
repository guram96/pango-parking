import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { City } from "./City";

@Entity()
export default class ParkingPrice {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(
		() => City,
		(city) => city.parkingPrice,
	)
	city: City;

	@Column()
	from: string;

	@Column()
	to: string;

	@Column("double precision")
	price: number;
}
