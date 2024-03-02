import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState  } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import CommonHeader from './Header';
import Button from 'react-bootstrap/esm/Button';
import styles from './CharacterCommunity.module.css';
import CharacterTab from './CharacterTab';

export default function CharacterCommunity(){
	const navigate = useNavigate();

	const [currentTab, setCurrentTab] = useState(0);
	const [searchInput, setSearchInput] = useState('');
	const [characterList, setCharacterList] = useState('');
	const [filteredData,setFilteredData] = useState()
	const [params, setParams] = useState({category:currentTab+1})
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

	const getCharacters = async () => {
		const res = await axios.get("http://13.209.167.220/characters/list",{params});
		// 답장
		setCharacterList(res.data.character);
		setFilteredData(res.data.character)
	}

	
	useEffect(() =>{
		getCharacters();
	},[params])

	const tabClickHandler=(index)=>{
		setParams({category:index+1})
		setCurrentTab(index);
	};
	const searchItems = (searchValue) => {
		setSearchInput(searchValue)
		setFilteredData(characterList.filter((item) => {
			return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
		}))
	}

	const tabContArr = [
		{
			tabTitle:(
				<li className={currentTab==0 ? styles.isActiveTab : styles.notActiveTab} onClick={() => tabClickHandler(0)} key={0}>웹툰/웹소</li>
			),
			tabCont:(
				<CharacterTab filteredData={filteredData} realId={realId} searchItems={searchItems} key={0}/>
			)
		},
		{
			tabTitle:(
				<li className={currentTab==1 ? styles.isActiveTab : styles.notActiveTab} onClick={() => tabClickHandler(1)} key={1}>만화/애니</li>
			),
			tabCont:(
				<CharacterTab filteredData={filteredData} realId={realId} searchItems={searchItems} key={1}/>
			)
		},
		{
			tabTitle:(
				<li className={currentTab==2 ? styles.isActiveTab : styles.notActiveTab} onClick={() => tabClickHandler(2)} key={2}>게임</li>
			),
			tabCont:(
				<CharacterTab filteredData={filteredData} realId={realId} searchItems={searchItems} key={2}/>
			)
		},
		{
			tabTitle:(
				<li className={currentTab==3 ? styles.isActiveTab : styles.notActiveTab} onClick={() => tabClickHandler(3)} key={3}>실존인물</li>
			),
			tabCont:(
				<CharacterTab filteredData={filteredData} realId={realId} searchItems={searchItems} key={3}/>
			)
		},
		{
			tabTitle:(
				<li className={currentTab==4 ? styles.isActiveTab : styles.notActiveTab} onClick={() => tabClickHandler(4)} key={4}>기타</li>
			),
			tabCont:(
				<CharacterTab filteredData={filteredData} realId={realId} searchItems={searchItems} key={4}/>
			)
		}
	]

	return(
		<div className={styles.Background}>
			<CommonHeader content="캐릭터 목록" isCharacter={true} userId={realId}/>
			<div className={styles.CharacterSetList}>
				<ul className={styles.tabs}>
					{tabContArr.map((section,index)=>{
						return section.tabTitle
					})}
				</ul>
				{tabContArr[currentTab].tabCont}
				
			</div>
		</div>
	)
}