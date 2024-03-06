import { useNavigate } from "react-router-dom";

import { BsChevronLeft } from "react-icons/bs";
import { CiSquarePlus } from "react-icons/ci";
import { Button } from "react-bootstrap";

import './Header.css'

export default function ChatHeader(props){
	const navigate = useNavigate();

	const onClickBack = (userId) => {
		navigate('/character',{state:{userId:userId}});
	}

	const onClickCreate = (userId) => {
		navigate('/character/setting', {state:{userId:userId}})
	}

	return(
		<div className="HeaderContainer">
			{props.isCharacter? <div/> : <BsChevronLeft size={28} onClick={() => onClickBack(props.userId)}/>}
			<div className="ChatCenter">
				<Button onClick={()=>window.open("https://t.co/OXqqe4K3eX")}>설문</Button>
				<h2 className="text" style={{marginLeft:'5%'}}>{props.content}</h2>
			</div>
			
			{props.count ? <div>남은 채팅:{51 - props.count}</div> : <div/>}
		</div>
	)
	
}