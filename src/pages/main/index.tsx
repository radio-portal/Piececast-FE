import Banner from "./Banner";
import Content from "./Content";

const Main = () => {
	return (
		<div className="flex-1 h-full flex flex-col">
			<Banner />
			<Content />
		</div>
	)
}

export default Main;