import { useNavigate } from "react-router-dom";

import { BsChevronLeft } from "react-icons/bs";
import { CiSquarePlus } from "react-icons/ci";
import { Button } from "react-bootstrap";
import { IoPersonAddOutline } from "react-icons/io5";
import ReactGA from "react-ga4";

import './Header.css'

export default function CommonHeader(props){
	const navigate = useNavigate();

	const onClickBack = (userId) => {
		navigate(-1,{state:{userId:userId}});
	}

	const onClickCreate = (userId) => {
		ReactGA.event({
			category: "Button",
			action: "Visit Create Page"
		})
		navigate('/character/setting', {state:{userId:userId}})
	}

	return(
		<div className="HeaderContainer">
			{props.isCharacter? <Button onClick={()=>window.open("https://t.co/OXqqe4K3eX")} className="SurveyBtn">설문</Button> : <BsChevronLeft size={28} onClick={() => onClickBack(props.userId)}/>}
			<h2 className="text" style={props.isCharacter ? {marginLeft:"9%"}: {marginRight:"10%"}}>{props.content}</h2>
			{props.isCharacter ? <div className="d-flex flex-column align-items-center" onClick={() => onClickCreate(props.userId)}>
				<IoPersonAddOutline size={20}/>
				<div style={{fontSize:"80%"}}>캐릭터 생성</div>
				</div> : <div/>}
		</div>
	)
	
}