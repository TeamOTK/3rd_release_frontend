import Button from 'react-bootstrap/esm/Button'
import { useNavigate } from 'react-router-dom';

import './Situation.css'
import Footer from './Footer';

import SubHeader from './Header/SubHeader';

export default function Situation(){
	

	return(
		<>
			<SubHeader name='청명'/>
			<div className='wrapper'>
				<div className='orderBox'>"청명"과 대화하고 싶은 상황을 선택해주세요</div>
				<div className='situationList'>
					<div className='situationItem'>
						{/* <img className='situationImg' src={CM}/> */}
						<div className='situationText'>화산이 아니라 종남으로 환생한다면?</div>
					</div>
				</div>
				<Footer />
			</div>
		</>
		
	)
}