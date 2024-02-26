import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { v4 as uuidv4 } from 'uuid';

import './Pages.css'
import { useState } from 'react';

export default function MainPage(){
	const navigate = useNavigate();
	
	const [realId, setRealId] = useState('');

	const getUserId = () => {
		// 로컬 스토리지에서 사용자 ID를 시도하여 가져옴
		let userId = localStorage.getItem('userId');
		// 사용자 ID가 없으면 새로 생성하여 저장
		if (!userId) {
			userId = uuidv4();
			localStorage.setItem('userId', userId);
		}
		return userId;
	};

	const registerId = async () => {
		const res = await axios.post("http://13.209.167.220/users/register", {
				"uuid": userId
		});
		// 답장
		setRealId(res.data.user.user_id)
	}

	const userId = getUserId();
	registerId();

	const handleClick = () => {
		navigate('/warning', {state: {userId: realId}});
	}

	return(
		<div className='MainPageBackGround'>
			<div className='BtnContainer'>
				<div className='MainPageLargeTextSet'>
					<h1 className='MainPageLargeText'>차차</h1>
					<div className='TextBox'>
						{/* <img src={Pencil} width={38} height={38} style={{marginTop:'2%'}}></img> */}
						<h1 className='MainPageLargeText2'>Chat Character</h1>
					</div>
				</div>
				<div className='MainPageSmallTextSet'>
					<h2 className='MainPageSmallText'>좋아하는 캐릭터를 만들어</h2>
					<h2 className='MainPageSmallText'>원하는 상황에서 대화해보세요!</h2>
				</div>
			</div>
			<Button variant='primary' className='StartButton' onClick={handleClick}>차차 시작하기</Button>
		</div>
	)
}