import { Outlet } from 'react-router-dom';


export default function ChatLayout(){
	return(
		<div style={{height:'100%'}}>
			<Outlet />
		</div>
	)
}