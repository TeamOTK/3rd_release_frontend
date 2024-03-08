import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import styles from './CharacterCommunity.module.css'
import { BiCommentDetail } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { MdOutlinePersonOutline } from "react-icons/md";
import { useState } from 'react';
import ReactGA from "react-ga4";
import { Button } from 'react-bootstrap';

export default function CharacterTab(props){
	const navigate = useNavigate();

	const onClickViewSetting = (character) => {
		ReactGA.event({
			category: "Button",
			action: "View character's option"
		})
		navigate('/character/setting', {state:{userId:props.realId, characterId:character.character_id}});
	}
	
	async function onClickChat (character){
		ReactGA.event({
			category: "Button",
			action: "Chat with other's character"
		})
		const params = { character_id: character.character_id }
		await axios.get("http://13.209.167.220/chats/cntupdate", {params});
		navigate('/warning', {state:{userId:props.realId, characterId:character.character_id, name:character.name, imgName:character.img}});
	}


	return(
		<div className={styles.tabCont}>
			<div className={styles.SearchContainer}>
				<BsSearch size={24}></BsSearch> 
				<input className={styles.CommunitySearch} onChange={(e) => props.searchItems(e.target.value)}></input>
			</div>
			{props.filteredData && props.filteredData.map((character) => {
				return(
					<div className={styles.CharacterSetItem} key={character.character_id}>
						<img src={`https://chacha-spark.s3.ap-northeast-2.amazonaws.com/character/${character.img}`} className={styles.CommunityItemImg} />
						<div className={styles.CommunityItemInfo}>
							<div className={styles.InfoBox}>
								<div style={{width:"80%"}}>
									<div className={styles.nameBox}>{character.name}</div>
									<div className={styles.ItemDesc}>{character.description}</div>
								</div>
								<div className={styles.userCountBox}>
									<div className={styles.CountSmall}>
										<MdOutlinePersonOutline size={20}/>
										<div style={{fontSize:'85%', marginLeft:"2%"}}>{character.user_cnt}</div>
									</div>
									<div className={styles.CountSmall}>
										<BiCommentDetail style={{marginTop:"1%"}} size={20}/>
										<div style={{fontSize:'85%', marginLeft:"2%"}}>{character.chat_cnt}</div>
									</div>
								</div>
							</div>
							<div className={styles.ButtonBox}>
								<div className={styles.CommunityItemBtn} onClick={() => onClickChat(character)}>대화하기</div>
								<div className={styles.CommunityItemBtn2} onClick={() => onClickViewSetting(character)}>설정 보기</div>
							</div>
						</div>
					</div>
				)
			})}
		</div>
	)
}