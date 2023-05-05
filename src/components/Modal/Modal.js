import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import PropTypes from 'prop-types';
import './Modal.css';
import { Button } from 'react-bootstrap';

const Modal = ({ modalHeader, modalBody, buttonText, buttonOnClick, num, toggle, isOpen }) => {
  const modalNumber = `modal${num}`;

  return (
  <MDBContainer>
    <MDBModal isOpen={isOpen[modalNumber]} toggle={() => toggle(modalNumber)} centered>
      <MDBModalHeader toggle={() => toggle(modalNumber)}>{modalHeader}</MDBModalHeader>
      <MDBModalBody>{modalBody}</MDBModalBody>
      <MDBModalFooter>
        <Button color="secondary" onClick={() => toggle(modalNumber)}>Close</Button>
        <Button color="primary" onClick={buttonOnClick}>{buttonText}</Button>
      </MDBModalFooter>
    </MDBModal>
  </MDBContainer>
  );
};

export default Modal;

Modal.defaultTypes = {
  buttonOnClick: () => {}
};

Modal.propTypes = {
  modalHeader: PropTypes.string.isRequired,
  modalBody: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonOnClick: PropTypes.func,
  num: PropTypes.number.isRequired,
  toggle: PropTypes.func.isRequired,
  isOpen: PropTypes.object.isRequired
};
