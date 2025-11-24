import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import WithdrawForm from "./WithdrawForm";
import PropTypes from "prop-types";

function WithdrawFundsBtn({ user }) {
  return (
    <div>
      <Modal>
        <Modal.Open opens="withdraw-form">
          <Button>Withdraw Funds</Button>
        </Modal.Open>
        <Modal.Window name="withdraw-form">
          <WithdrawForm withdrawingUser={user} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

WithdrawFundsBtn.propTypes = {
  user: PropTypes.object,
};

export default WithdrawFundsBtn;
