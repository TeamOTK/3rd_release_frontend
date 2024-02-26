import SubHeader from './Header/SubHeader';
import { BsSearch } from "react-icons/bs";

import './Search.css'

export default function Search(){
	return(
		<>
			<SubHeader name='검색'/>
			<div className='SearchContainer'>
				<div className="SearchBox">
					<BsSearch size={30}/>
					<input type='text'className='SearchBoxText'></input>
				</div>
				<button className='CancelSearch'>취소</button>
			</div>
			<div className='WebtoonRank'>
				<div style={{fontSize:'150%',fontWeight:'bold'}}>인기 웹툰</div>
			</div>
			<div className='FictionRank'>
				<div style={{fontSize:'150%',fontWeight:'bold'}}>인기 상황</div>
			</div>
			<div className='CharacterRank'>
				<div style={{fontSize:'150%',fontWeight:'bold'}}>지금 사랑 받는 캐릭터</div>
				<div className='CharacterList'>
					<div className='CharacterItem'></div>
					<div className='CharacterItem'></div>
					<div className='CharacterItem'></div>
					<div className='CharacterItem'></div>
				</div>
			</div>
			
			
		</>
	)
}