
import './Character_Fiction_Page.css'

export default function CharacterFicion({handleClickCharacter}) {
	// const datas = require('../../data/situation.json');
	const datas = []

	return(
		<>
			<div className='CharacterLargeTextSet'>
				<h2 className='CharacterPageLargeText'>웹툰 캐릭터가 되어 상황극을 즐겨보세요!</h2>
			</div>
			<div className='FictionList'>
				{/* map 함수 이용해 아이템 추가 */}
				{datas.map((item) => (
					<div className='FictionItem' key={item.bot}>
							<div className='FictionCharacter'>
								{/* <img src={require(`../../images/${item.img_name}.png`)} className='FictionCharacterImg'/> */}
								<div className='CharacterDesc'>
									<div className='NameInfo'>{item.bot}</div>
									<div className='PlatformInfo'>네이버웹툰</div>
									<div className='WebtoonInfo'>{item.story}</div>
								</div>
							</div>
							<div className='SubFictionList'>
								<div className='SubFictionItem' onClick={() => handleClickCharacter(item.children[0].id)} key={item.children[0].id}>{item.children[0].sit_title}</div>
								<div className='SubFictionItem' onClick={() => handleClickCharacter(item.children[1].id)} key={item.children[1].id}>{item.children[1].sit_title}</div>
							</div>
					</div>)
				)}
				
			</div>
		</>
			
		
	)
}