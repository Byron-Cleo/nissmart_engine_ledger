import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import TransferForm from "./TransferForm";
import PropTypes from "prop-types";

function TransferFundsBtn({ user }) {
  return (
    <div>
      <Modal>
        <Modal.Open opens="transfer-form">
          <Button>Send Money</Button>
        </Modal.Open>
        <Modal.Window name="transfer-form">
          <TransferForm sendingUser={user} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

TransferFundsBtn.propTypes = {
  user: PropTypes.object,
};

export default TransferFundsBtn;
