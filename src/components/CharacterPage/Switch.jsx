import './Switch.css'

export default function SwitchComponent({isOn, setisOn}){

	const toggleHandler = () => {
		// isOn의 상태를 변경하는 메소드를 구현
		setisOn(!isOn)
	};
	
	return (
    <>
      <div className='ToggleContainer' onClick={toggleHandler}>
				<div className='ToggleBox'>
					<div className={`toggle-container ${isOn ? "toggle--checked" : null}`}>
						<div className='smallBox'>채팅</div>
						<div className='smallBox2'>상황극</div>
					</div>
					{isOn === false ? <div className={`toggle-circle ${isOn ? "toggle--checked" : null}`}>채팅</div> : <div className={`toggle-circle ${isOn ? "toggle--checked" : null}`}>상황극</div>}
				</div>
      </div>
      
    </>
  );
}

