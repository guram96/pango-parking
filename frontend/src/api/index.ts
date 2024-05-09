import type { LoginForm } from "../pages/Login";
import type { RegisterForm } from "./../pages/SignUp";

// TODO: move this to env file
const API_URL = "http://localhost:3000";

export const fetchCities = async () => {
	const response = await fetch(`${API_URL}/api/city/all`);
	return response.json();
};

export const fetchUserParkingLogs = async (userId: number) => {
	const response = await fetch(`${API_URL}/api/user/parking-logs/${userId}`);
	return response.json();
};

export const startParking = async (data: {
	userId: number;
	parkingArea: string;
}) => {
	const response = await fetch(`${API_URL}/api/user/start-parking`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	return response.json();
};

export const stopParking = async (data: { userId: number }) => {
	const response = await fetch(`${API_URL}/api/user/stop-parking`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	return response.json();
};
export const login = async (data: LoginForm) => {
	const response = await fetch(`${API_URL}/api/user/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	return response.json();
};

export const register = async (data: RegisterForm) => {
	const response = await fetch(`${API_URL}/api/user/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	return response.json();
};
