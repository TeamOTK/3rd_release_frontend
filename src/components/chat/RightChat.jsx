import './Chat.css'

export default function Rightchat({name, content}) {
	return (
		<div className="UserChat">
			<div className='UserText'>{content}</div>
		</div>
	)
}