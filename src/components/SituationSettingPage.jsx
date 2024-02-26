import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import { BsChevronLeft } from "react-icons/bs";
import Form from 'react-bootstrap/Form';
import './CharacterSettingPage.css'


export default function SituationSettingPage(){
	const navigate = useNavigate();
	const location = useLocation();

	const [situation, setSituation] = useState('');
	const [firstConv, setFirstConv] = useState('');

	const [situationLabel, setSituationLabel] = useState('10자 이상 작성해주세요');
	const [isSituation, setIsSituation] = useState(false)
	const [firstConvLabel, setFirstConvLabel] = useState('1자 이상 작성해주세요');
	const [isFirstConv, setIsFirstConv] = useState(false)

	const character_id = location.state.character_id
	const name = location.state.character_name
	const imgName = location.state.imgName
	const userId = location.state.userId;

	const sendSituation = async () => {
		const res = await axios.post("http://13.209.167.220/situations/create", {
				"user_id": userId,
				"character_id": character_id,
				"name": name,
				"description": situation,
				"first_conv": firstConv,
		});

		// 답장
		const params = { character_id: character_id }
		await axios.get("http://13.209.167.220/chats/cntupdate", {params});
		navigate('/page/chat/0', {state: {userId: userId, characterId: character_id, situationId: res.data.situation.situation_id, character_name: name, imgName: imgName, firstConv:firstConv}})
	}

	const onChangeSituation = (e) => {
		setSituation(e.target.value)
		if(e.target.value.length < 10){
			setSituationLabel("10자 이상 작성해주세요")
			setIsSituation(false)
		}
		else{
			setSituationLabel("자세히 쓸수록 성능이 좋아져요!")
			setIsSituation(true)
		}
	}

	const onChangeFirstConv = (e) => {
		setFirstConv(e.target.value)
		if(e.target.value.length < 1){
			setFirstConvLabel("1자 이상 작성해주세요")
			setIsFirstConv(false)
		}
		else{
			setFirstConvLabel("재밌게 만들어보세요!")
			setIsFirstConv(true)
		}
	}

	const onClickButton = () => {
		navigate('/setting/character', {state: {userId: userId}});
	}

	const handleClickButton = () => {
		if(isFirstConv && isSituation){
			sendSituation();
		}
	}

	const ClickExButton = () => {
		setSituation("강아지가 주인인 나와 산책가는 상황. 강아지는 산책하러 나와서 기분이 좋다.")
		setSituationLabel("자세히 쓸수록 성능이 좋아져요!")
		setIsSituation(true)
	}

	return(
		<>
			<div className='WarningHeader'>
				<BsChevronLeft size={25} onClick={onClickButton}/>
				<h2 className="text"></h2>
				{/* <BsSearch size={30} style={{marginRight:'3%',fontWeight:'bold'}} onClick={handleClickSearch}/> */}
				<div></div>
			</div>
			<div className='SettingPageBackGround'>
				<div className='SettingBtnContainer'>
					<div className='WarningLargeTextSet'>
						<h2 className='WarningPageLargeText'>대화 상황을 설정해주세요</h2>
					</div>
					<div className='SubWarning'>캐릭터는 사용자의 창작물입니다.</div>
					<div className='Settings'>
						<Form className='SettingBox'>
							<div className='TagBox'>
								<Form.Label className='Tag'>상황</Form.Label>
								<Form.Label className={isSituation? 'LabelOkay' : 'LabelWarning' }>{situationLabel}</Form.Label>
								<Form.Label style={{textDecoration:'underline', marginLeft:'2%'}} onClick={ClickExButton}>예시 입력</Form.Label>
							</div>
							<Form.Control className='inputBox' value={situation} rows={6} as='textarea' onChange={onChangeSituation}></Form.Control>
							<div>예시: (캐릭터)가 (사용자 설정)인 나와 00하는 상황.</div>
						</Form>
						<Form className='SettingBox'>
							<div className='d-flex flex-row align-items-center'>
								<Form.Label className='Tag'>첫 대사</Form.Label>
								<Form.Label className={isFirstConv? 'LabelOkay' : 'LabelWarning' }>{firstConvLabel}</Form.Label>
							</div>
							<Form.Control className='inputBox' value={firstConv} rows={1} as='textarea' onChange={onChangeFirstConv}></Form.Control>
						</Form>
					</div>
				</div>
				<Button className='SettingButton' onClick={handleClickButton}>채팅 시작하기</Button>
			</div>
		</>
		
	)
}