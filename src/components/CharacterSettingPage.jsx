import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { BsChevronLeft } from "react-icons/bs";
import { CiCircleCheck } from "react-icons/ci";
import Form from 'react-bootstrap/Form';
import AWS from "aws-sdk"

import styles from './CharacterSettingPage.module.css';
import { useEffect, useState } from 'react';
import CommonHeader from './Header';

export default function CharacterSettingPage(){
	const navigate = useNavigate();
	const location = useLocation();

	const [name, setName] = useState('');
	const [category,setCategory] = useState(0);
	const [description, setDescription] = useState('');
	const [setting, setSetting] = useState('');
	const [accent, setAccent] = useState('');
	const [personality, setPersonality] = useState('')
	const [open, setOpen] = useState(true);
	const [imgSrc, setimgSrc] = useState('');
	const [uploadFile, setUploadFile] = useState('');
	const [uploadImgName, setUploadImgName] = useState("default.jpeg");

	const [titleLabel, setTitleLabel] = useState("캐릭터 생성")
	const [nameLabel, setNameLabel] = useState("캐릭터의 이름입니다.")
	const [categoryLabel, setCategoryLabel] = useState("카테고리를 선택해 주세요.")
	const [descLabel, setDescLabel] = useState("캐릭터의 짧은 한 줄 소개를 적어 주세요.")
	const [settingLabel, setSettingLabel] = useState("캐릭터의 특성, 행적, 배경 등의 설정을 '/'로 구분하여 넣어 주세요.")
	const [accentLabel, setAccentLabel] = useState("캐릭터의 말투를 완성된 문장으로 넣어주세요.")
	const [imgLabel,setImgLabel] = useState("캐릭터 사진 선택")
	const [BtnLabel, setBtnLabel] = useState("다음 단계로")

	const [isName,setIsName] = useState(false);
	const [isCategory, setIsCategory] = useState(false)
	const [isDesc, setIsDesc] = useState(false)
	const [isSetting,setIsSetting] = useState(false);
	const [isAccent,setIsAccent] = useState(false);

	useEffect(() => {
		if(location.state.characterId){
			const params = {character_id:location.state.characterId}
			const getCharacter = async () => {
				const res = await axios.get("http://13.209.167.220/characters/setting",{params});
				// 답장
				setName(res.data.character.name)
				setTitleLabel("캐릭터 설정")
				setDescription(res.data.character.description)
				setSetting(res.data.character.setting)
				setAccent(res.data.character.example_conv)
				setCategory(res.data.character.category)
				setOpen(true)
				setUploadImgName(res.data.character.img)
				setImgLabel("사진 선택됨")
				setIsName(true)
				setIsCategory(true)
				setIsDesc(true)
				setIsSetting(true)
				setIsAccent(true)
			}
			getCharacter();
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
		if(fileBlob){
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
		}
	};

	const userId = location.state.userId;

	async function sendSetting() {
		if (uploadFile == '') {
			const res = await axios.post("http://13.209.167.220/characters/create", {
				"user_id": userId,
				"name": name,
				"description": description,
				"category": category,
				"setting": setting,
				"example_conv": accent,
				"personality": personality,
				"open": open,
				"img": uploadImgName,
				"user_cnt": 0
			});
			navigate('/chat', {state: {userId: userId, characterId: res.data.character.character_id, character_name: name, imgName:uploadImgName}})
		}
		else {
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
				"description":description,
				"category": category,
				"setting": setting,
				"example_conv": accent,
				"personality": personality,
				"open": open,
				"img": uploadImgName,
				"user_cnt": 0
			});
			navigate('/chat', {state: {userId: userId, character_id: res.data.character.character_id, character_name: name, imgName:uploadImgName}})
		}
	}

	const onChangeNameInput = (e) => {
		setName(e.target.value)
		if(e.target.value.length < 1){
			setIsName(false)
		}
		else{
			setIsName(true)
		}
	}

	const onChangeCategory = (e) => {
		setCategory(e.target.value)
		if(e.target.value != 0){
			setIsCategory(true)
		}
	}

	const onChangeDescription = (e) => {
		setDescription(e.target.value)
		if(e.target.value.length < 1){
			setIsDesc(false)
		}
		else{
			setIsDesc(true)
		}
	}

	const onChangeSettingInput = (e) => {
		setSetting(e.target.value)
		if(e.target.value.length < 1){
			setIsSetting(false)
		}
		else{
			setIsSetting(true)
		}
	}

	const onChangeAccentInput = (e) => {
		setAccent(e.target.value)
		if(e.target.value.length < 1){
			setIsAccent(false)
		}
		else{
			setIsAccent(true)
		}
	}

	const onChangePersonalityInput = (e) => {
		setPersonality(e.target.value)
	}

	const onClickPersonalityItem = (item) => {
		setPersonality(personality + item)
	}

	const onClickButton = () => {
		// navigate('/warning', {state: {userId: userId}});
	}
	const handleClickButton = () => {
		// navigate('/community', {state: {userId: userId}})
	}
	const handleClickNextButton = () => {
		if(isName && isCategory && isDesc && isSetting && isAccent){
			sendSetting();
		}
		else{
			setBtnLabel("필수 항목 입력!")
		}
	}

	return(
		<div className={styles.Background}>
			<CommonHeader content={titleLabel}/>
				<div className={styles.ScrollBackGround}>
					<div className={styles.SubWarning}>캐릭터는 사용자의 창작물입니다.</div>
					<div className={styles.Settings}>
						<Form className={styles.NameCategoryBox}>
							<div className={styles.NameCategory}>
								<div className='d-flex flex-row align-items-center'>
									<Form.Label className={styles.Tag}>이름<span className={styles.RequiredStar}>*</span></Form.Label>
									<Form.Label className={styles.LabelOkay}>{nameLabel}</Form.Label>
								</div>
								<Form.Control className={styles.inputBox} type='text' name='name' value={name} onChange={onChangeNameInput}></Form.Control>
							</div>
							<div className={styles.NameCategory}>
								<div className='d-flex flex-row align-items-center'>
									<Form.Label className={styles.Tag}>분류<span className={styles.RequiredStar}>*</span></Form.Label>
									<Form.Label className={styles.LabelOkay}>{categoryLabel}</Form.Label>
								</div>
								<Form.Select className={styles.inputBox} value={category} onChange={onChangeCategory}>
									<option value={0}>카테고리 설정</option>
									<option value={1}>웹툰/웹소</option>
									<option value={2}>만화/애니</option>
									<option value={3}>게임</option>
									<option value={4}>실존인물</option>
									<option value={5}>기타</option>
								</Form.Select>
							</div>
						</Form>
						<Form className={styles.SettingBox}>
							<div className='d-flex flex-row align-items-center'>
								<Form.Label className={styles.Tagtwo}>소개<span className={styles.RequiredStar}>*</span></Form.Label>
								<Form.Label className={styles.LabelOkay}>{descLabel}</Form.Label>
							</div>
							<Form.Control className={styles.inputBox} rows={1} as='textarea' name='setting' value={description}  onChange={onChangeDescription}></Form.Control>
						</Form>
						<Form className={styles.SettingBox}>
							<div className='d-flex flex-row align-items-center'>
								<Form.Label className={styles.Tagtwo}>설정<span className={styles.RequiredStar}>*</span></Form.Label>
								<div className='d-flex flex-column'>
									<Form.Label className={styles.LabelOkay}>{settingLabel}</Form.Label>
									<Form.Label className={styles.LabelOkay}>길수록 반영이 잘 됩니다. (예: 고등학생임 / 똑똑함 / 친구랑 사이가 좋음)</Form.Label>
								</div>
							</div>
							<Form.Control className={styles.inputBox} rows={4} as='textarea' name='setting' value={setting}  onChange={onChangeSettingInput}></Form.Control>
						</Form>
						<Form className={styles.SettingBox}>
							<div className='d-flex flex-row align-items-center'>
								<Form.Label className={styles.TagEx}>대화 예시<span className={styles.RequiredStar}>*</span></Form.Label>
								<div className='d-flex flex-column'>
									<Form.Label className={styles.LabelOkay}>{accentLabel}</Form.Label>
									<Form.Label className={styles.LabelOkay}>(예: 하하, 안녕. / 야호 넌 누구니?)(추임새만 넣으면 말을 반복합니다.)</Form.Label>
								</div>
							</div>
							<Form.Control className={styles.inputBox} rows={4} as='textarea' name='accent' value={accent}onChange={onChangeAccentInput}></Form.Control>
						</Form>
						<Form className={styles.SettingBox}>
							<div className='d-flex flex-row align-items-center'>
								<Form.Label className={styles.Tag}>성격</Form.Label>
								<div className='d-flex flex-column'>
									<Form.Label className={styles.LabelOkay}>캐릭터의 성격을 골라 주세요. 키워드가 보기에 없다면 직접 입력해 주세요.</Form.Label>
									<Form.Label className={styles.LabelOkay}>(예: 똑똑함 / 친절함)</Form.Label>
								</div>
							</div>
							<div className='d-flex flex-row justify-content-between'>
								<div className={styles.PersonalityItem} onClick={() => onClickPersonalityItem('친절함 / ')}><CiCircleCheck style={{marginRight:"3%"}}size={20}/>친절함</div>
								<div className={styles.PersonalityItem} onClick={() => onClickPersonalityItem('똑똑함 / ')}><CiCircleCheck style={{marginRight:"3%"}} size={20}/>똑똑함</div>
								<div className={styles.PersonalityItem} onClick={() => onClickPersonalityItem('외향적 / ')}><CiCircleCheck style={{marginRight:"3%"}} size={20}/>외향적</div>
								<div className={styles.PersonalityItem} onClick={() => onClickPersonalityItem('내향적 / ')}><CiCircleCheck style={{marginRight:"3%"}} size={20}/>내향적</div>
							</div>
							<Form.Control className={styles.inputBox} rows={1} as='textarea' name='personality' value={personality}  onChange={onChangePersonalityInput}></Form.Control>
						</Form>
						<div className={styles.OpenBox}>
							<Form.Label className={styles.Tag}>캐릭터 공개 여부</Form.Label>
							<Form className={styles.radioContainer}>
								<Form.Group className={styles.radioBox} id='radioBox'>
									<Form.Check type='radio' name='open' label='공개' style={{width:'40%'}} onChange={() => setOpen(true)}  defaultChecked/>
									<Form.Check type='radio'  name='open' label= '비공개' style={{width:'40%'}} onChange={() => setOpen(false)} />
								</Form.Group>
							</Form>
						</div>
						<div className={styles.OpenBox}>
							<div className={styles.imgBox}>
								<label htmlFor='imgUpload' className={styles.inputFileButton}>{imgLabel}</label>
								<input type='file' id='imgUpload' accept="image/*" style={{display:'none'}}  onChange={(e) => {;
								handleFileInput(e.target.files[0])}} />
								{imgSrc && <img src={imgSrc} className={styles.imgPreview} />}
							</div>
						</div>
						<Button className={styles.SettingButton} onClick={handleClickNextButton}>{BtnLabel}</Button>
					</div>
				</div>
			</div>
	)
}