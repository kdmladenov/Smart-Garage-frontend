import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import PropTypes from 'prop-types';
import './Modal.css';

const Modal = ({ modalHeader, modalBody, buttonText, buttonOnClick, num, toggle, isOpen }) => {
  const modalNumber = `modal${num}`;

  return (
  <MDBContainer>
    <MDBModal isOpen={isOpen[modalNumber]} toggle={() => toggle(modalNumber)} centered>
      <MDBModalHeader toggle={() => toggle(modalNumber)}>{modalHeader}</MDBModalHeader>
      <MDBModalBody>{modalBody}</MDBModalBody>
      <MDBModalFooter>
        <MDBBtn color="secondary" onClick={() => toggle(modalNumber)}>Close</MDBBtn>
        <MDBBtn color="primary" onClick={buttonOnClick}>{buttonText}</MDBBtn>
      </MDBModalFooter>
    </MDBModal>
  </MDBContainer>
  );
};

export default Modal;

Modal.propTypes = {
  modalHeader: PropTypes.string.isRequired,
  modalBody: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonOnClick: PropTypes.func.isRequired,
  num: PropTypes.number.isRequired,
  toggle: PropTypes.func.isRequired,
  isOpen: PropTypes.object.isRequired
};
