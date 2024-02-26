import { useNavigate } from "react-router-dom";
import React from 'react';

import { BsJustify } from "react-icons/bs";
import Dropdown from 'react-bootstrap/Dropdown';
import './MainHeader.css'

export default function MainHeader(){
	const navigate = useNavigate()

	const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      style={{ verticalAlign: 'text-bottom' }}
    >
      {children}
    </a>
  ));

	return(
		<header>
			<div className='header'>
				<Dropdown>
					<Dropdown.Toggle as={CustomToggle}>
						<BsJustify size={52} style={{marginLeft:'10px', color:'black'}}/>	
					</Dropdown.Toggle>
					<Dropdown.Menu>
						<Dropdown.Item onClick={() => navigate('/main')}>메인</Dropdown.Item>
						<Dropdown.Item onClick={() => navigate('/character')}>캐릭터 선택</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</div>
		</header>
	)
}