import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import DepositForm from "./DepositForm";
import PropTypes from "prop-types";

function DepositFundsBtn({ user }) {
  return (
    <div>
      <Modal>
        <Modal.Open opens="deposit-form">
          <Button>Deposit Funds</Button>
        </Modal.Open>
        <Modal.Window name="deposit-form">
          <DepositForm depositingUser={user} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

DepositFundsBtn.propTypes = {
  user: PropTypes.object,
};

export default DepositFundsBtn;
