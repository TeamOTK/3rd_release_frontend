import { useLocation, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { BsChevronLeft } from "react-icons/bs";
import { v4 as uuidv4 } from 'uuid';

import './WarningPage.css'

export default function WarningPage(){
	const navigate = useNavigate();
	const location = useLocation();

	const userId = location.state.userId;

	const onClickButton = () => {
		navigate('/main');
	}

	const handleClick = () => {
		navigate('/setting/character', {state:{userId:userId}});
	}

	return(
		<div className='MainPageBackGround'>
			<div className='WarningHeader'>
				<BsChevronLeft size={25} onClick={onClickButton}/>
				<h2 className="text"></h2>
				{/* <BsSearch size={30} style={{marginRight:'3%',fontWeight:'bold'}} onClick={handleClickSearch}/> */}
				<div></div>
			</div>
			<div className='WarningBtnContainer'>
				<div className='WarningLargeTextSet'>
					<h1 className='WarningPageLargeText'>주의 사항</h1>
				</div>
				<div className='WarningSmallTextSet'>
					<div className='WarningSet'>
						<div>🍀 차차는 사용자 여러분이 자유롭게 캐릭터를</div>
						<div>생성하고, 대화할 수 있도록 돕는 서비스입니다.</div>
					</div>
					<div className='WarningSet'>
						<div>🤖 캐릭터 챗봇이 말하는 모든 것은 인공지능</div>
						<div>이 생성한 허구의 문장입니다. 챗봇의 말을 진지</div>
						<div>하게 받아들이지 않기를 권장하며, 모티브가 된</div>
						<div>실제 인물이나 캐릭터 등과는 별개입니다. </div>
					</div>
					<div className='WarningSet'>
						<div>🤬 개발 중인 서비스인 만큼 의도치 않게 다소</div>
						<div>부적절한 언행이 만들어질 수 있습니다. 이런</div>
						<div>경우에는 설문에 따로 작성 부탁드립니다.</div>
					</div>
					<div className='WarningSet'>
						<div>💌 차차를 통해 사용자 여러분이 상상만 했던 </div>
						<div>일들을 이루어내기를 바랍니다. 즐겁게 즐겨 주</div>
						<div>시고, 대화 후 설문도 해 주시면 감사하겠습니다.</div>
					</div>
				</div>
			</div>
			<Button variant='primary' className='WarningButton' onClick={handleClick}>주의사항을 확인했습니다.</Button>
		</div>
	)
}