import {
	type SubmitHandler,
	createForm,
	email,
	minLength,
	required,
	maxLength,
} from "@modular-forms/solid";
import { register } from "../api";
import { setUserStore } from "../store";
import { useNavigate } from "@solidjs/router";
import { createSignal } from "solid-js";

export type RegisterForm = {
	firstName: string;
	lastName: string;
	email: string;
	carPlate: string;
};

export default function Register() {
	const navigate = useNavigate();
	const [error, setError] = createSignal("");
	const [_, { Form, Field }] = createForm<RegisterForm>();

	const handleSubmit: SubmitHandler<RegisterForm> = async (values, event) => {
		event.preventDefault();

		const res = await register(values);
		if (res.status === 200 && res.data) {
			setUserStore({ user: res.data });
			sessionStorage.setItem("user", JSON.stringify(res.data));
			return navigate("/");
		}

		setError(res.errors);
	};

	return (
		<>
			<section class="slider_section ">
				<div class="container ">
					<div class="row">
						<div class="col-lg-7 col-md-8 mx-auto">
							<div class="detail-box">
								<h1>
									Register to use Wango parking <br />
								</h1>
								{error() ? <p> error() </p> : null}
							</div>
						</div>
					</div>
					<div class="find_container ">
						<div class="container">
							<div class="row">
								<div class="col">
									<Form onSubmit={handleSubmit}>
										<div class="form-row ">
											<div class="form-group col-lg-3">
												<Field
													name="firstName"
													validate={[required("Please enter first name.")]}
												>
													{(field, props) => (
														<>
															<input
																{...props}
																type="text"
																class="form-control"
																placeholder="First Name"
																required
															/>
															{field.error && (
																<small
																	class="form-text"
																	style={{ color: "red" }}
																>
																	{field.error}
																</small>
															)}
														</>
													)}
												</Field>
											</div>
											<div class="form-group col-lg-3">
												<Field
													name="lastName"
													validate={[required("Please enter your last name.")]}
												>
													{(field, props) => (
														<>
															<input
																{...props}
																type="email"
																class="form-control"
																placeholder="Last Name"
																required
															/>
															{field.error && (
																<small
																	class="form-text"
																	style={{ color: "red" }}
																>
																	{field.error}
																</small>
															)}
														</>
													)}
												</Field>
											</div>
											<div class="form-group col-lg-3">
												<Field
													name="email"
													validate={[
														required("Please enter your email."),
														email("The email address is badly formatted."),
													]}
												>
													{(field, props) => (
														<>
															<input
																{...props}
																type="email"
																class="form-control"
																placeholder="Email"
																required
															/>
															{field.error && (
																<small
																	class="form-text"
																	style={{ color: "red" }}
																>
																	{field.error}
																</small>
															)}
														</>
													)}
												</Field>
											</div>
											<div class="form-group col-lg-3">
												<Field
													name="carPlate"
													validate={[
														required("Please enter your license plate number."),
														minLength(7, "Must be a minimum of 7 characters."),
														maxLength(7, "Must be a maximum of 7 characters."),
													]}
												>
													{(field, props) => (
														<>
															<input
																{...props}
																type="text"
																name="licenseplate"
																class="licenseplate"
																maxlength="7"
																placeholder="ABC 1234"
															/>
															{field.error && (
																<small
																	class="form-text"
																	style={{ color: "red" }}
																>
																	{field.error}
																</small>
															)}
														</>
													)}
												</Field>
											</div>
											<div class="form-group col-lg-3">
												<div class="btn-box">
													<button type="submit" class="btn ">
														Sign up
													</button>
												</div>
											</div>
										</div>
									</Form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
