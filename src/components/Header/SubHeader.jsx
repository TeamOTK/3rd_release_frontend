import { useNavigate } from "react-router-dom";

import { BsChevronLeft } from "react-icons/bs";
import { BsBookmarkHeartFill } from "react-icons/bs";

import './SubHeader.css'

export default function SubHeader(props){
	const navigate = useNavigate();

	const onClickButton = () => {
		navigate(-1);
	}

	return(
		<>
			<div className='SubHeader'>
				<BsChevronLeft size={25} onClick={onClickButton}/>
				{/* 이름 이후 전달 받아서 출력하는 것으로 수정 예정 */}
				<h2 className="text">{props.name}</h2>
				{/* <BsBookmarkHeartFill size={25}/> */}
				<div style={{width:'25px'}}></div>
			</div>
		</>
		
	)
}