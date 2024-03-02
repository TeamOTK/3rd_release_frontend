import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';

import Button from 'react-bootstrap/esm/Button';
import { BsCursorFill } from "react-icons/bs";
import styles from './Chat.module.css';
import { BsChevronLeft } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";

import ChatHeader from '../Header_Chat';
import Rightchat from './RightChat';
import Leftchat from './LeftChat';

export default function Chat(){
	const navigate = useNavigate();
	const location = useLocation();
	
	const [isChat, setIsChat] = useState(false)

	const characterId = location.state.characterId;
	const name = location.state.name;
	const imgName = location.state.imgName;
	const user =  "user"
	
	const [chats, setChats] = useState([]);
	const [content,setContent] = useState('');
	const [msgLabel, setMsgLabel] = useState("메세지를 입력하세요")
	const [count, setCount] = useState(0)
	const [userId, setUserId] = useState("");

	const getUserId = () => {
		// 로컬 스토리지에서 사용자 ID를 시도하여 가져옴
		let uId = localStorage.getItem('userId');
		// 사용자 ID가 없으면 새로 생성하여 저장
		if (!uId) {
			uId = uuidv4();
			localStorage.setItem('userId', uId);
		}
		return uId;
	};

	useEffect(() => {
		const uId = getUserId();
		const registerId = async () => {
			const res = await axios.post("http://13.209.167.220/users/register", {
					"uuid": uId
			});
			// 답장
			setCount(res.data.user.chat_cnt)
			setUserId(res.data.user.user_id)
			if(res.data.user.cha_cnt > 50){
				setIsChat(true)
				setMsgLabel("최대 채팅 수에 도달하였습니다.")
			}
		}
		registerId();
	},[])

	useEffect(()=>{
		const getHistory = async () => {
			const params = {user_id:userId, character_id:location.state.characterId}
			const res = await axios.get("http://13.209.167.220/chats/history", {params})
			// 답장
			res.data.chats.map((chat) => {
				setChats(currentChats => [...currentChats, { key: Date.now(), name: user, content:chat.user_chat }]);
				setChats(currentChats => [...currentChats, { key: Date.now(), name: name, content:chat.ai_chat}]);
			})
		}
		userId && getHistory();
	},[userId])

	useEffect(() => {
		if(count > 50){
			setIsChat(true)
			setMsgLabel("최대 채팅 수에 도달하였습니다.")
		}
	},[count])

	const sendChat = async () => {
		setIsChat(true)
		setMsgLabel("답변 생성 중입니다...")
		setChats(currentChats => [...currentChats, { key: Date.now(), name: user, content }]);
		setContent('');
		const res = await axios.post(`http://13.209.167.220/chats/response`, {
			"user_id": userId,
			"character_id": characterId,
			"user_chat": content
		});
		// 답장
		setChats(currentChats => [...currentChats, { key: Date.now(), name: name, content: res.data.chat.response }]);
		setCount(res.data.chat.chat_cnt)
		setMsgLabel("메세지를 입력하세요")
		setIsChat(false)
	}

	const handleOnKeyPress = (e) => {
		if (e.nativeEvent.isComposing) return;
		if (e.key === 'Enter') {
			sendChat(); // Enter 입력이 되면 클릭 이벤트 실행
		}
	};

	const scrollRef = useRef()

	useEffect(() => {
		scrollToBottom();
	}, [chats]);

	const scrollToBottom = () => {
			if (scrollRef.current) {
					scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
			}
	};
	return(
		<div className={styles.Background}>
			<ChatHeader content={name} userId={userId} count={count}/>
			{/* {count < 10 ? <div></div> : <Button className={styles.SurveyBtn} onClick={()=>window.open("https://forms.gle/cSZAF8EfoSvoTqiL7")}>!설문!</Button>} */}
			<div className={styles.ChatContainer}>
				<div className={styles.ChatLog} ref={scrollRef}>
					{chats && chats.map((chat, index) => (
						chat.name === user ?
						<Rightchat key={index} name={chat.name} content={chat.content}/> :
						<Leftchat key={index} name={chat.name} content={chat.content} imgName={imgName}/>
					))}
				</div>
			</div>
			
			<div className='d-flex justify-content-center' style={{height:'6%', marginTop:'4%'}}>
				<div className={styles.InputBox}>
					<input type='text'className={styles.InputBoxText} placeholder={msgLabel} value={content} disabled={isChat? true : false} onChange={e => setContent(e.target.value)} onKeyDown={handleOnKeyPress}></input>
					<div onClick={sendChat} className={styles.InputBtn}>
						<BsCursorFill size={24} style={{color:'black'}} />
					</div>
				</div>
			</div>
		</div>
	)
}