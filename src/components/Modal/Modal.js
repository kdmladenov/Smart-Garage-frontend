import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import PropTypes from 'prop-types';

const Modal = ({ modalHeader, modalMessage, buttonText, buttonOnClick, num, toggle, isOpen }) => {
  const modalNumber = `Modal${num}`;

  return (
  <MDBContainer>
    <MDBModal isOpen={isOpen[modalNumber]} toggle={() => toggle(num)} centered>
      <MDBModalHeader toggle={() => toggle(num)}>{modalHeader}</MDBModalHeader>
      <MDBModalBody>{modalMessage}</MDBModalBody>
      <MDBModalFooter>
        <MDBBtn color="secondary" onClick={() => toggle(num)}>Close</MDBBtn>
        <MDBBtn color="primary" onClick={buttonOnClick}>{buttonText}</MDBBtn>
      </MDBModalFooter>
    </MDBModal>
  </MDBContainer>
  );
};

export default Modal;

Modal.propTypes = {
  modalHeader: PropTypes.string.isRequired,
  modalMessage: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonOnClick: PropTypes.func.isRequired,
  num: PropTypes.number.isRequired,
  toggle: PropTypes.func.isRequired,
  isOpen: PropTypes.object.isRequired
};
