import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { BsChevronLeft } from "react-icons/bs";
import Form from 'react-bootstrap/Form';
import { v4 as uuidv4 } from 'uuid';
import AWS from "aws-sdk"

import './CharacterSettingPage.css'
import { useEffect, useState } from 'react';

export default function CharacterSettingPage(){
	const navigate = useNavigate();
	const location = useLocation();

	const [name, setName] = useState('');
	const [setting, setSetting] = useState('');
	const [accent, setAccent] = useState('');
	const [personality, setPersonality] = useState('')
	const [open, setOpen] = useState(true);
	const [imgSrc, setimgSrc] = useState('');
	const [uploadFile, setUploadFile] = useState('');
	const [uploadImgName, setUploadImgName] = useState("none");

	const [nameLabel, setNameLabel] = useState("1자 이상 작성해주세요")
	const [settingLabel, setSettingLabel] = useState("10자 이상 작성해주세요")
	const [accentLabel, setAccentLabel] = useState("10자 이상 작성해주세요")
	const [imgLabel,setImgLabel] = useState("사진 선택")

	const [isName,setIsName] = useState(false);
	const [isSetting,setIsSetting] = useState(false);
	const [isAccent,setIsAccent] = useState(false);

	useEffect(() => {
		if(location.state.isCommunity){
			setName(location.state.name)
			setSetting(location.state.setting)
			setAccent(location.state.accent)
			setPersonality(location.state.personality)
			setOpen(false)
			setUploadImgName(location.state.img)
			setNameLabel("다른 사용자의 설정입니다")
			setAccentLabel("다른 사용자의 설정입니다")
			setSettingLabel("다른 사용자의 설정입니다")
			setImgLabel("사진 선택됨")
			setIsName(true)
			setIsSetting(true)
			setIsAccent(true)
		}
	},[])
	

	const region = "ap-northeast-2";
    const bucket = "chacha-spark/character";

	AWS.config.update({
		region: region,
		accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
	});

	const handleFileInput = async (fileBlob) => {
		setImgLabel("사진 선택됨")
		setUploadFile(fileBlob);
		
		const reader = new FileReader();
		reader.readAsDataURL(fileBlob);
		return new Promise((resolve) => {
			reader.onload = () => {
				setimgSrc(reader.result);
				resolve();
			};
		});
	};

	const userId = location.state.userId;

	const sendSetting = async () => {
		if(location.state.isCommunity){
			navigate('/setting/situation', {state: {userId: userId, character_id: location.state.characterId, character_name: name, imgName:uploadImgName}})
		}
		else{
			if(uploadFile == ''){
				const uploadImgName = "default.jpeg";
				const res = await axios.post("http://13.209.167.220/characters/create", {
					"user_id": userId,
					"name": name,
					"setting":setting,
					"accent": accent,
					"personality": personality,
					"open": open,
					"img": uploadImgName,
					"user_cnt": 0
				});
				navigate('/setting/situation', {state: {userId: userId, character_id: res.data.character.character_id, character_name: name, imgName:uploadImgName}})
			}
			else{
				const uploadImgName = Date.now() + ".png";
				const upload = new AWS.S3.ManagedUpload({
					params: {
							Bucket: bucket, // 버킷 이름
							Key: uploadImgName, // 유저 아이디
							Body: uploadFile, // 파일 객체
					},
				});
				const promise = upload.promise();
				promise.then(
						function () {
								// 이미지 업로드 성공
						},
						function (err) {
							console.log(err)
								// 이미지 업로드 실패
						}
				);
				const res = await axios.post("http://13.209.167.220/characters/create", {
					"user_id": userId,
					"name": name,
					"setting":setting,
					"accent": accent,
					"personality": personality,
					"open": open,
					"img": uploadImgName,
					"user_cnt": 0
				});
				navigate('/setting/situation', {state: {userId: userId, character_id: res.data.character.character_id, character_name: name, imgName:uploadImgName}})
			}
		}
	}

	const onChangeNameInput = (e) => {
		setName(e.target.value)
		if(e.target.value.length < 1){
			setNameLabel("1자 이상 작성해주세요")
			setIsName(false)
		}
		else{
			setIsName(true)
			setNameLabel("자세히 쓸수록 성능이 좋아져요!")
		}
	}

	const onChangeSettingInput = (e) => {
		setSetting(e.target.value)
		if(e.target.value.length < 10){
			setSettingLabel("10자 이상 작성해주세요")
			setIsSetting(false)
		}
		else{
			setIsSetting(true)
			setSettingLabel("자세히 쓸수록 성능이 좋아져요!")
		}
	}

	const onChangeAccentInput = (e) => {
		setAccent(e.target.value)
		if(e.target.value.length < 10){
			setAccentLabel("10자 이상 작성해주세요")
			setIsAccent(false)
		}
		else{
			setIsAccent(true)
			setAccentLabel("자세히 쓸수록 성능이 좋아져요!")
		}
	}

	const onChangePersonalityInput = (e) => {
		setPersonality(e.target.value)
	}


	const onClickButton = () => {
		navigate('/warning', {state: {userId: userId}});
	}
	const handleClickButton = () => {
		navigate('/community', {state: {userId: userId}})
	}
	const handleClickNextButton = () => {
		if(isName && isSetting && isAccent){
			sendSetting();
		}
		else{
			
		}
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
				<div className='ScrollBackGround'>
					<div className='WarningLargeTextSet'>
						<h2 className='WarningPageLargeText'>캐릭터를 설정해주세요</h2>
					</div>
					<div className='SubWarning'>캐릭터는 사용자의 창작물입니다.</div>
					<div className='Settings'>
						<div className='SettingTopBox'>
							<div className='d-flex flex-column'>
								<div style={{fontWeight:'600'}}>캐릭터 설정이 어려운 분들은</div>
								<div style={{fontWeight:'600'}}>다른 사용자의 캐릭터를 선택해보세요</div>
							</div>
							<Button className='SettingTopBtn' onClick={handleClickButton}>찾아보기</Button>
						</div>
						<Form className='SettingBox'>
							<div className='d-flex flex-row align-items-center'>
								<Form.Label className='Tag'>이름</Form.Label>
								<Form.Label className={isName? 'LabelOkay' : 'LabelWarning'}>{nameLabel}</Form.Label>
							</div>
							<Form.Label className='small-text'>화면에 표시될 캐릭터의 이름입니다.</Form.Label>
							<Form.Control className='inputBox' type='text' name='name' value={name} disabled={location.state.isCommunity ? true : false} onChange={onChangeNameInput}></Form.Control>
						</Form>
						<Form className='SettingBox'>
							<div className='d-flex flex-row align-items-center'>
								<Form.Label className='Tag'>설정</Form.Label>
								<Form.Label className={isSetting? 'LabelOkay' : 'LabelWarning' }>{settingLabel}</Form.Label>
							</div>
							<Form.Label className='small-text'>캐릭터의 특성, 행적, 배경 등의 설정을 넣어주세요.
							설정이 길고 구체적일수록 더욱 입체적인 캐릭터와 대화가 가능합니다.</Form.Label>
							<Form.Label className='small-text'>각 내용은 "/" 로 구분해주세요.</Form.Label>
							<Form.Label className='small-text'>(예: 똑똑함 / 고등학생 / 19살 / 동생이 있음)</Form.Label>
							<Form.Control className='inputBox' rows={3} as='textarea' name='setting' value={setting} disabled={location.state.isCommunity ? true : false} 
							onChange={onChangeSettingInput}> </Form.Control>
						</Form>
						<Form className='SettingBox'>
							<div className='d-flex flex-row align-items-center'>
								<Form.Label className='Tag'>말투</Form.Label>
								<Form.Label className={isAccent? 'LabelOkay' : 'LabelWarning' }>{accentLabel}</Form.Label>
							</div>
							<Form.Label className='small-text'>캐릭터의 평소 말투를 참고할 수 있는 문장을 넣어 주세요.
							3개~5개 정도 넣으면 적절한 대화가 가능합니다.</Form.Label>
							<Form.Label className='small-text'>각 내용은 "/" 로 구분해주세요.</Form.Label>
							<Form.Label className='small-text'>(예: 안녕하세요. / 차차입니다. / 잘 부탁드립니다.)</Form.Label>
							<Form.Control className='inputBox' rows={4} as='textarea' name='accent' value={accent} disabled={location.state.isCommunity ? true : false} onChange={onChangeAccentInput}></Form.Control>
						</Form>
						<Form className='SettingBox'>
							<div className='d-flex flex-row align-items-center'>
								<Form.Label className='Tag'>성격</Form.Label>
								<Form.Label style={{fontSize:"90%", color:"gray"}}>선택 사항입니다</Form.Label>
							</div>
							<Form.Label className='small-text'>캐릭터의 성격을 알 수 있는 말을 키워드로 넣어 주세요. 
							필수 사항은 아니며, 성격을 정확하게 입력할수록 입체적인 캐릭터와 대화가 가능합니다.</Form.Label>
							<Form.Label className='small-text'>각 내용은 "/" 로 구분해주세요.</Form.Label>
							<Form.Control className='inputBox' trows={2} as='textarea' name='personality' value={personality} disabled={location.state.isCommunity ? true : false} onChange={onChangePersonalityInput}></Form.Control>
						</Form>
						<div className='OpenBox'>
							<Form.Label className='Tag'>캐릭터 공개 여부</Form.Label>
							<Form className='radioContainer'>
								<Form.Group className='radioBox' id='radioBox'>
									<Form.Check type='radio' disabled={location.state.isCommunity ? true : false} name='open' label='공개' style={{marginRight:'10%'}} onChange={() => setOpen(true)} defaultChecked={location.state.isCommunity ? false : true}/>
									<Form.Check type='radio' disabled={location.state.isCommunity ? true : false} name='open' label= '비공개' onChange={() => setOpen(false)} defaultChecked={location.state.isCommunity ? true : false}/>
								</Form.Group>
							</Form>
						</div>
						<div className='OpenBox'>
							<Form.Label className='Tag'>캐릭터 사진</Form.Label>
							<div className='imgBox'>
								<label htmlFor='imgUpload' className='input-file-button'>{imgLabel}</label>
								<input type='file' id='imgUpload' accept="image/*" style={{display:'none'}} disabled={location.state.isCommunity? true : false} onChange={(e) => {
									handleFileInput(e.target.files[0]);
								}} />
								{imgSrc && <img src={imgSrc} className='imgPreview' />}
							</div>
						</div>
						<Button className='SettingButton' onClick={handleClickNextButton}>다음 단계로</Button>
					</div>
				</div>
			</div>
		</>
		
	)
}