import { For, createEffect, createSignal, onCleanup } from "solid-js";
import { cityStore, setCityStore, userStore } from "../store";
import {
	fetchCities,
	fetchUserParkingLogs,
	startParking,
	stopParking,
} from "../api";
import getElapsedTime from "../utils/get-elapsed-time";
import { ParkingLog } from "../store/types";

export type RegisterForm = {
	firstName: string;
	lastName: string;
	email: string;
	carPlate: string;
};

export default function Slider() {
	let timer: unknown;
	const [parkingAreas, setParkingAreas] = createSignal([]);
	const [selectedCity, setSelectedCity] = createSignal("");
	const [selectedParkingArea, setSelectedParkingArea] = createSignal("");
	const [parkingLogs, setParkingLogs] = createSignal<ParkingLog[]>([]);
	const [timeElapsed, setTimeElapsed] = createSignal("");
	const [userIsParked, setUserIsParked] = createSignal(false);

	// fetch parking logs
	createEffect(async () => {
		await fetchParkingLogs()
	}, userStore.user);

	// if user has parked then start the timer
	createEffect(() => {
		const activeParkingLog = parkingLogs().find((e) => e.isParked);
		if (!activeParkingLog) return;
		setUserIsParked(!!activeParkingLog);

		timer = setInterval(() => {
			setTimeElapsed(getElapsedTime(new Date(activeParkingLog.startTime)));
		}, 1000);
	}, parkingLogs);

	// get cities and parking areas
	createEffect(async () => {
		const result = await fetchCities();
		if (result.status === 200 && result.data) {
			setCityStore({ cities: result.data });
		}
	});

	const handleCityChange = (value: string) => {
		setSelectedCity(value);
		const cityParkingAreas = cityStore.cities.find((e) => e.name === value);
		if (cityParkingAreas) {
			setParkingAreas(cityParkingAreas.parkingAreas);
		}
	};

	const fetchParkingLogs = async () => {
		const result = await fetchUserParkingLogs(userStore.user!.id);

			if (result.status === 200 && result.data) {
				setParkingLogs(result.data);
			}
	}

	const handleSubmit = async (e: MouseEvent) => {
		e.preventDefault();

		if (!selectedCity && !selectedParkingArea) return;
		
		if (userIsParked()) {
			setUserIsParked(false);

			await stopParking({
				userId: userStore.user!.id,
			});
			
			return await fetchParkingLogs();
		}

		// start parking timer // TODO: add parking city
		await startParking({
			userId: userStore.user!.id,
			parkingArea: selectedParkingArea(),
		});
		return await fetchParkingLogs();

		return;
	};

	// @ts-ignore timeout return type is causing type conflict
	onCleanup(() => clearInterval(timer));

	return (
		<>
			<section class="slider_section ">
				<div class="container ">
					<div class="row">
						<div class="col-lg-7 col-md-8 mx-auto">
							<div class="detail-box">
								<h1>
									Park your car <br />
								</h1>
								<p>
									After choosing the city please choose the parking are and hit
									"pay with Wango" button.
								</p>
							</div>
						</div>
					</div>
					<div class="find_container ">
						<div class="container">
							<div class="row">
								<div class="col">
									<form>
										<div class="form-row ">
											<div class="form-group col-lg-3"></div>

											<div class="form-group col-lg-3">
												<select
													name=""
													class="form-control wide"
													id="inputCities"
													onChange={(e) => handleCityChange(e.target.value)}
												>
													<option>Choose city</option>
													<For each={cityStore.cities}>
														{(item) => (
															<option value={item.name}>{item.name}</option>
														)}
													</For>
												</select>
											</div>
											<div class="form-group col-lg-3">
												<select
													name=""
													class="form-control wide"
													id="inputParkingAreas"
													onChange={(e) =>
														setSelectedParkingArea(e.target.value)
													}
												>
													<option>Choose parking area</option>
													<For each={parkingAreas()}>
														{(item) => <option value={item}>{item}</option>}
													</For>
												</select>
											</div>
											<div class="form-group col-lg-3">
												<div class="btn-box">
													{!userStore.user ? (
														<button type="submit" class="btn disabled" disabled>
															pay with Wango
														</button>
													) : (
														<button
															type="submit"
															class="btn"
															onClick={handleSubmit}
														>
															{userIsParked()
																? "Stop parking"
																: "pay with Wango"}
														</button>
													)}
												</div>
											</div>
										</div>
									</form>
									<div class="detail-box">
										<p>Your parking logs</p>
									</div>
									<table class="table table-dark">
										<thead>
											<tr>
												<th scope="col">#</th>
												<th scope="col">City</th>
												<th scope="col">Parking Area</th>
												<th scope="col">Start time</th>
												<th scope="col">End time</th>
												<th scope="col">Elapsed Time</th>
												<th scope="col">Price</th>
												<th scope="col">Total</th>
												<th scope="col">Still Parked</th>
											</tr>
										</thead>
										<tbody>
											<For each={parkingLogs()}>
												{(log) => (
													<tr>
														<th scope="row">{log.id}</th>
														<td>{log.city}</td>
														<td>{log.parkedOnSpace}</td>
														<td>{new Date(log.startTime).toLocaleString()}</td>
														<td>{log.endTime}</td>
														<td>{log.isParked ? timeElapsed() : "N/A"}</td>
														<td>{log.price}</td>
														<td>{log.total}</td>
														<td>{log.isParked ? "Yes" : "No"}</td>
													</tr>
												)}
											</For>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
