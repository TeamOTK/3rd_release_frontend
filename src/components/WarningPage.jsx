import { useLocation, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { BsChevronLeft } from "react-icons/bs";

import styles from './WarningPage.module.css';
import CommonHeader from './Header';

export default function WarningPage(){
	const navigate = useNavigate();
	const location = useLocation();

	const handleClick = () => {
		navigate('/chat', {state:{userId:location.state.userId, characterId: location.state.characterId, name: location.state.name, imgName: location.state.imgName}});
	}

	return(
		<div className={styles.BackGround}>
			<CommonHeader content="주의사항"/>
			<div className={styles.WarningBtnContainer}>
				<div className={styles.WarningSmallTextSet}>
					<div className={styles.WarningSet}>
						<div style={{fontSize:"120%", fontWeight:"600"}}>🤖 캐릭터 챗봇이 말하는 모든 것은 인공지능</div>
						<div style={{fontSize:"110%", fontWeight:"600"}}>이 생성한 허구의 문장입니다. 챗봇의 말을 진지</div>
						<div style={{fontSize:"110%", fontWeight:"600"}}>하게 받아들이지 않기를 권장하며, 모티브가 된</div>
						<div style={{fontSize:"110%", fontWeight:"600"}}>실제 인물이나 캐릭터 등과는 별개입니다. </div>
					</div>
					<div className={styles.WarningSet}>
						<div style={{fontSize:"120%", fontWeight:"600"}}>🤬 개발 중인 서비스인 만큼 의도치 않게 다소</div>
						<div style={{fontSize:"110%", fontWeight:"600"}}>부적절한 언행이 만들어질 수 있습니다.</div>
						<div style={{fontSize:"110%", fontWeight:"600"}}>이런 경우에는 설문에 따로 작성 부탁드립니다.</div>
					</div>
					<div className={styles.WarningSet}>
						<div style={{fontSize:"120%", fontWeight:"600"}}>💌 차차를 통해 사용자 여러분이 상상만 했던 </div>
						<div style={{fontSize:"110%", fontWeight:"600"}}>일들을 이루어내기를 바랍니다. 즐겁게 즐겨 주</div>
						<div style={{fontSize:"110%", fontWeight:"600"}}>시고, 대화 후 설문도 해 주시면 감사하겠습니다.</div>
					</div>
					<Button variant='primary' className={styles.WarningButton} onClick={handleClick}>주의사항을 확인했습니다.</Button>
				</div>
			</div>
			
		</div>
	)
}