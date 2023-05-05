import { MDBPopover, MDBPopoverBody, MDBPopoverHeader } from 'mdbreact';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const ButtonWithPopover = ({ handleClickButton, children, message }) => {
  return (
    <>
      <MDBPopover placement="left" popover clickable id="delete-popover">
        <Button type="button">{children}</Button>
        <div>
          <MDBPopoverHeader>Are you sure?</MDBPopoverHeader>
          <MDBPopoverBody>
            <Button
              color="red"
              onClick={() => {
                handleClickButton(true);
              }}
            >
              {message}
            </Button>
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
