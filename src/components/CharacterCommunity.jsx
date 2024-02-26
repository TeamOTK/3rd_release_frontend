import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState  } from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/esm/Button';
import './CharacterCommunity.css'
import { BsChevronLeft } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";


export default function CharacterCommunity(){
	const navigate = useNavigate();
	const location = useLocation();

	const [characterList, setCharacterList] = useState('');
	const [searchInput, setSearchInput] = useState('');
	const [filteredData,setFilteredData] = useState()

	const userId = location.state.userId;
	const getCharacters = async () => {
		const res = await axios.get("http://13.209.167.220/characters/list");
		// 답장
		setCharacterList(res.data.character);
		setFilteredData(res.data.character)
	}

	const searchItems = (searchValue) => {
		setSearchInput(searchValue)
		setFilteredData(characterList.filter((item) => {
			return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
		}))
	}
	useEffect(() =>{
		getCharacters();
	},[])

	const onClickButton = () => {
		navigate('/setting/character', {state: {userId: userId}});
	}

	const onClickItem = (character) => {
		navigate('/setting/character', {state: {userId: userId, isCommunity:true, name:character.name, setting: character.setting, img:character.img, personality: character.personality, accent: character.accent, characterId: character.character_id}})
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
			<div className='WarningLargeTextSet'>
				<h2 className='WarningPageLargeText'>다른 사용자의 캐릭터</h2>
			</div>
			<div className='SubWarning'>캐릭터는 사용자의 창작물입니다.</div>
			<div className='SearchContainer'>
				<BsSearch size={24}></BsSearch> 
				<input className='CommunitySearch' onChange={(e) => searchItems(e.target.value)}></input>
			</div>
			<div className='CharacterSetList'>
				{filteredData && filteredData.map((character) => {
					return(
						<div className='CharacterSetItem' key={character.character_id}>
						<img src={`https://chacha-spark.s3.ap-northeast-2.amazonaws.com/character/${character.img}`} className='CommunityItemImg'/>
						<div className='CommunityItemInfo'>
							<div className='CommunityItemTopBox'>
								<div style={{fontWeight:"bold", fontSize:"140%", marginRight:'-24%'}}>{character.name}</div>
								<div style={{fontSize:'85%'}}>누적 사용자 {character.user_cnt}</div>
								<div className='CommunityItemBtn' onClick={() => onClickItem(character)}>사용하기</div>
							</div>
							<div className='ItemDesc'>{character.setting}</div>
						</div>
					</div>
					)
				})}
			</div>
		</div>
		</>
		
	)
}