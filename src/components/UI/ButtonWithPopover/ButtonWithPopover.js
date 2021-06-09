import { MDBBtn, MDBPopover, MDBPopoverBody, MDBPopoverHeader } from 'mdbreact';
import PropTypes from 'prop-types';

const ButtonWithPopover = ({ handleClickButton, children, message }) => {
  return (
    <>
      <MDBPopover placement="left" popover clickable id="delete-popover">
        <MDBBtn type="button">{children}</MDBBtn>
        <div>
          <MDBPopoverHeader>Are you sure?</MDBPopoverHeader>
          <MDBPopoverBody>
            <MDBBtn
              color="red"
              onClick={() => {
                handleClickButton(true);
              }}
            >
              {message}
            </MDBBtn>
          </MDBPopoverBody>
        </div>
      </MDBPopover>
    </>
  );
};

ButtonWithPopover.propTypes = {
  handleClickButton: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  message: PropTypes.string.isRequired
};

export default ButtonWithPopover;
