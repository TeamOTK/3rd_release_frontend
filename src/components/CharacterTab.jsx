import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import styles from './CharacterCommunity.module.css'
import { BiCommentDetail } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { useState } from 'react';

export default function CharacterTab(props){
	const navigate = useNavigate();

	const onClickViewSetting = (character) => {
		navigate('/character/setting', {state:{userId:props.realId, characterId:character.character_id}});
	}
	
	async function onClickChat (character){
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
									<BiCommentDetail size={24} style={{paddingTop:"4%"}}/>
									<div style={{fontSize:'100%', marginLeft:"2%"}}>{character.user_cnt}</div>
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