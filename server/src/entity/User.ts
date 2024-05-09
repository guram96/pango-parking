import {
	Column,
	Entity,
	Index,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Index({ unique: true })
	@Column()
	email: string;

	// carplate is the users password, needs to be encrypted
	@Column()
	carPlate: string;

	@OneToMany(
		() => UserParkingLog,
		(log) => log.user,
		{ cascade: true },
	)
	userParkingLog: UserParkingLog[];
}

@Entity()
export class UserParkingLog {
	@PrimaryGeneratedColumn()
	id: number;

	@Column("boolean")
	isParked: boolean;

	@Column()
	parkedOnSpace: string;

	@Column("timestamp")
	startTime: Date;

	@Column("timestamp", { nullable: true })
	endTime: Date;

	@ManyToOne(
		() => User,
		(user) => user.userParkingLog,
	)
	user: User;
}
