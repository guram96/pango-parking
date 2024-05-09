import "./App.scss";
import About from "./components/About";
import Category from "./components/Category";
import Experts from "./components/Experts";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Info from "./components/Info";
import Jobs from "./components/Jobs";

function App(props: any) {
	return (
		<>
			<div class="hero_area">
				<Header />
				{props.children}
			</div>
			<Category />
			<About />
			<Jobs />
			<Experts />
			<Info />
			<Footer />
		</>
	);
}

export default App;
