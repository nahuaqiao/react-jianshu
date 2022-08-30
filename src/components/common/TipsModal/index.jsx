import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

/**
 * @params {obj} modal context header and content
 * @params {boolean} modal display state
 * @params {function} how to hide this modal
 */
const TipsModal = ({ content, onHide, show = false }) => {
  return (
    <Modal show={show} onHide={onHide} size='lg' centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>{'Tips'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{content?.title}</h4>
        <p>{content?.detail}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

/**
 * how to use:
 *
 * import TipsModal, { useTipsModal } from '../../../components/common/TipsModal'
 *
 * const { show, content, setShow, showMessage } = useTipsModal()
 *
 * <TipsModal content={content} onHide={() => setShow(false)} show={show} />
 *
  showMessage({
    title: 'error',
    detail: "Current user doesn't have permission to delete this article.",
  })
 *
 * @returns
 */
export const useTipsModal = () => {
  const initialContent = {
    title: 'demo title',
    content: 'demo content',
  }

  const [show, setShow] = React.useState(false)
  const [content, setContent] = React.useState(initialContent)

  const showMessage = ({ title, detail }) => {
    setContent({ title, detail })
    setShow(true)
  }

  return {
    show,
    content,
    setShow,
    showMessage,
  }
}

export default TipsModal
