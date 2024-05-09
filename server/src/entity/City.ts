import {
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import ParkingPrice from "./ParkingPrice";

@Entity()
export class City {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column("varchar", { array: true })
	parkingAreas: string[];

	@OneToMany(
		() => ParkingPrice,
		(price) => price.city,
		{ cascade: true },
	)
	parkingPrice: ParkingPrice[];
}
