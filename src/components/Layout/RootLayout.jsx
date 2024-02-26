import { Outlet } from "react-router-dom"

import MainHeader from "../Header/MainHeader"

export default function RootLayout() {
	return(
		<div style={{height:'100%'}}>
			{/* <MainHeader /> */}
			<Outlet />
		</div>
	)
}