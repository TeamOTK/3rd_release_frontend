import { useNavigate } from "react-router-dom";

import './Footer.css'

export default function Footer(props) {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/page/chat');
	}
	return(
		<footer>
			<button className='bottomButton' onClick={handleClick}>대화 시작하기</button>
		</footer>
	)
}