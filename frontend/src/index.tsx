/* @refresh reload */
import { render } from "solid-js/web";

import "./index.scss";
import App from "./App";
import { Route, Router } from "@solidjs/router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/SignUp";

const root = document.getElementById("root");

render(
	() => (
		<Router root={App}>
			<Route path="/" component={Home} />
			<Route path="/login" component={Login} />
			<Route path="/register" component={Register} />
		</Router>
	),
	root!,
);
