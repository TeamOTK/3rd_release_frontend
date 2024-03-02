import { useNavigate } from "react-router-dom";

import { BsChevronLeft } from "react-icons/bs";
import { CiSquarePlus } from "react-icons/ci";

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
			<h2 className="text" style={{marginLeft:'5%'}}>{props.content}</h2>
			{props.count ? <div>남은 채팅:{51 - props.count}</div> : <div/>}
		</div>
	)
	
}