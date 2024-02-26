import './ChatHeader.css'

export default function ChatHeader(props){

	return(
		<>
			<div className='ChatHeader'>
				{/* 이름 이후 전달 받아서 출력하는 것으로 수정 예정 */}
				<h2 className="ChatHeaderText">캐릭터의 대화는 사용자의 설정에 따른 픽션입니다</h2>
				<h2 className="ChatHeaderText2">최대 50 채팅까지 가능합니다. 현재 {props.count}회</h2>
				{/* <div style={{width:'25px'}}></div> */}
			</div>
		</>
		
	)
}