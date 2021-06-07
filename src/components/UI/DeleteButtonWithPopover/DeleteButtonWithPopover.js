import { MDBBtn, MDBIcon, MDBPopover, MDBPopoverBody, MDBPopoverHeader } from 'mdbreact';
import PropTypes from 'prop-types';

const DeleteButtonWithPopover = ({ handleDeleteButton }) => {
  return (
    <>
      <MDBPopover placement="left" popover clickable id="delete-popover">
        <MDBBtn type="button">
          <MDBIcon icon="trash-alt" />
        </MDBBtn>
        <div>
          <MDBPopoverHeader>Are you sure?</MDBPopoverHeader>
          <MDBPopoverBody>
            <MDBBtn
              color="red"
              onClick={() => {
                handleDeleteButton(true);
              }}
            >
              Delete
            </MDBBtn>
          </MDBPopoverBody>
        </div>
      </MDBPopover>
    </>
  );
};

DeleteButtonWithPopover.propTypes = {
  handleDeleteButton: PropTypes.func.isRequired
};

export default DeleteButtonWithPopover;
