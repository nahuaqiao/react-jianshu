import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const TipsModal = ({ context, show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} size='lg' centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>{'Tips'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{context.header}</h4>
        <p>{context.content}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default TipsModal
