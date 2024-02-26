import './Chat.css'

import { useState } from 'react'

export default function Leftchat({name, content,imgName}) {
	// const [imgName,setImgName] = useState()
	// if(name == "전영중"){
	// 	setImgName("YeongJoong")
	// }
	return (
		<div className="AiChat">
			{imgName && <img src={`https://chacha-spark.s3.ap-northeast-2.amazonaws.com/character/${imgName}`} width={60}/>}
			<div className='AiChatBox'>
				<div className='AiName'>{name}</div>
				<div className='AiText'>{content}</div>
			</div>
		</div>
	)
}