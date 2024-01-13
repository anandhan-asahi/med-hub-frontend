import { Fragment } from "react";
import SideBar from "../../components/SideBar";
import "./MainLayout.css";
import Header from "../../components/Header";

const MainLayout = (props) => {
	return (
		<Fragment>
			<div className="main-layout__container">
				<div className="main-layout__items">
					<Header />
					<div className="main-layout__content">{props.children}</div>
				</div>
			</div>
		</Fragment>
	);
};

export default MainLayout;
