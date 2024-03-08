import { Button, Modal } from "react-bootstrap";

const EventModal = (props) =>{
	return(
		<Modal className="modal-center" show={props.show} onHide={() => props.setShow(false)}>
			<Modal.Header closeButton>
				<Modal.Title>
					<h5>이벤트 공지</h5>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
         <div>설문에 참여해주신분 중 추첨을 통해 경품을 지급할 예정입니다.</div>
				 <div>사용 후기를 설문에 남겨주세요!</div>
				 <div className="d-flex justify-content-center">
				 <Button size="lg" onClick={()=>window.open("https://t.co/OXqqe4K3eX")} className="SurveyBtn">설문</Button>
				 </div>
			</Modal.Body>
		</Modal>
	)
}

export default EventModal;