import { useNavigate } from 'react-router-dom';
import { useState  } from 'react';

import '../Pages.css'

import SwitchComponent from './Switch';
import { BsSearch } from "react-icons/bs";
import CharacterFicion from './Character_Fiction_Page';
import CharacterOriginal from './Character_Original_Page';


export default function CharacterPage(){
	const [isOn, setisOn] = useState(false);
	const navigate = useNavigate();

	const handleClickSearch= () => {
		navigate('/page/search')
	}

	const handleClickCharacter = (id) => {
		navigate(`/page/chat/${id}`)
	}

	return(
		<div className='MainPageBackGround'>
			<div className='CharacterHeader'>
				<SwitchComponent isOn = {isOn} setisOn={setisOn}/>
				{/* <BsSearch size={30} style={{marginRight:'3%',fontWeight:'bold'}} onClick={handleClickSearch}/> */}
			</div>
			{isOn === true ? <CharacterFicion handleClickCharacter={handleClickCharacter}/> :  <CharacterOriginal handleClickCharacter={handleClickCharacter}/>}
			
		</div>
	)
}