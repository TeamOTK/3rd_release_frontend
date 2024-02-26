import { useState, useEffect, React } from "react";

import './Character_Original_Page.css'

export default function CharacterOriginal({handleClickCharacter}) {
	// const datas = require('../../data/original.json');
	const datas = []

	return(
		<>
			<div className='CharacterLargeTextSet'>
				<h2 className='CharacterPageLargeText'>웹툰 등장 인물과 대화해보세요!</h2>
			</div>
			<div className='OriginalList'>
				{/* map 함수 이용해 아이템 추가 */}
				{datas.map((item) => (
					<div className='OriginalItem' onClick={() => handleClickCharacter(item.id)} key={item.id}>
							<div className='OriginalCharacter'>
								{/* <img src={require(`../../images/${item.img_name}.png`)} className='OriginalCharacterImg'/> */}
								<div className='OriginalCharacterDesc'>
									<div className='NameInfo'>{item.bot}</div>
									<div className='PlatformInfo'>네이버웹툰</div>
									<div className='WebtoonInfo'>{item.story}</div>
								</div>
							</div>
					</div>
				)
				)}
			</div>
		</>
			
		
	)
}