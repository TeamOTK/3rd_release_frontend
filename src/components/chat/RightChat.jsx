import styles from './Chat.module.css'

export default function Rightchat({name, content}) {
	return (
		<div className={styles.UserChat}>
			<div className={styles.UserText}>{content}</div>
		</div>
	)
}