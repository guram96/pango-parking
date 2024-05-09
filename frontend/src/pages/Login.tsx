import {
	type SubmitHandler,
	createForm,
	email,
	minLength,
	required,
	maxLength,
} from "@modular-forms/solid";
import { setUserStore } from "../store";
import { login } from "../api";
import { useNavigate } from "@solidjs/router";

export type LoginForm = {
	email: string;
	carPlate: string;
};

// type FunctionComponent<P = object> = (props: P) => JSX.Element;

export default function Login() {
	// const [error, setError] = createSignal("");
	const navigate = useNavigate();

	const [_, { Form, Field }] = createForm<LoginForm>();

	const handleSubmit: SubmitHandler<LoginForm> = async (values, event) => {
		event.preventDefault();

		const res = await login(values);
		if (res.status === 200 && res.data) {
			setUserStore({ user: res.data });
			sessionStorage.setItem("user", JSON.stringify(res.data));
			return navigate("/");
		}

		// setError(res.errors);
	};

	return (
		<>
			<section class="slider_section ">
				<div class="container ">
					<div class="row">
						<div class="col-lg-7 col-md-8 mx-auto">
							<div class="detail-box">
								<h1>
									Long to your account <br />
								</h1>
							</div>
						</div>
					</div>
					<div class="find_container ">
						<div class="container">
							<div class="row">
								<div class="col">
									<Form onSubmit={handleSubmit}>
										<div class="form-row ">
											<div class="form-group col-lg-3"></div>
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
																type="carPlate"
																class="form-control"
																placeholder="License Plate"
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
												<div class="btn-box">
													<button type="submit" class="btn ">
														Login
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
