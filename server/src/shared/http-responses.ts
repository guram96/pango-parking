type HttpResponse<T, E> = {
	status: number;
	data: T;
	errors: E;
	message: string;
};

export function successResponse(res, data) {
	return res.status(200).json(<HttpResponse<null, unknown>>{
		status: 200,
		data: data,
		errors: null,
		message: "Success!",
	});
}

export function badRequestResponse(res, errors) {
	return res.status(400).json(<HttpResponse<null, unknown>>{
		status: 400,
		data: null,
		errors,
		message: "Bad Request!",
	});
}

export function internalServerErrorResponse(res, errors) {
	return res.status(500).json(<HttpResponse<null, unknown>>{
		status: 500,
		data: null,
		errors,
		message: "Internal Server Error!",
	});
}
