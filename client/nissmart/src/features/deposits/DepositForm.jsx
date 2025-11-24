import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { depositCash } from "../../actions/depositActions";
import { DEPOSIT_CREATE_RESET } from "../../constants/depositConstants";
import PropTypes from "prop-types";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Heading from "../../ui/Heading";

const StyledSpan = styled.span`
  
  color: ${({ bal }) =>
    bal === "bal" ? "#bf2c1b" :
    ""};
`;

function DepositForm({ depositingUser = {}, onCloseModal }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [amount, setAmount] = useState("");
  const [wallet, setWallet] = useState({});
  const [depositingUserId, setDepositingUserId] = useState(null);

  const depositAmount = useSelector((state) => state.depositFund);
  const { loading, success } = depositAmount;

  useEffect(() => {
    if (success) {
      dispatch({ type: DEPOSIT_CREATE_RESET });
      toast.success("Funds Successfully Deposited 🎉 🚀");
      onCloseModal?.();
      navigate("/dashboard");
    }

    if (depositingUser) {
      const { id, firstName, lastName, wallet } = depositingUser;
      setDepositingUserId(id);
      setFirstName(firstName);
      setLastName(lastName);
      setWallet(wallet);
    }
  }, [dispatch, depositingUser, navigate, success, onCloseModal]);

  const userDepositHandler = (e) => {
    e.preventDefault();
    const user = {
      id: depositingUserId,
      firstName,
      lastName,
      amount,
    };
    dispatch(depositCash(user));
  };

  return (
    <Form
      onSubmit={userDepositHandler}
      type={onCloseModal ? "modal" : "regular"}
    >
      <Heading as="h1">
        Your Wallet Balance: <StyledSpan bal="bal">KSh: {wallet?.walletBalance}</StyledSpan>
      </Heading>

      <FormRow label="First Name">
        <Input type="text" id="firstName" value={firstName} readonly />
      </FormRow>
      <FormRow label="Last Name">
        <Input type="text" id="lastName" value={lastName} readonly />
      </FormRow>
      <FormRow label="Amount to Deposit">
        <Input
          type="text"
          id="email"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          disabled={loading}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>

        <Button disabled={loading}>
          {loading ? "Depositing..." : "Deposit Funds"}
        </Button>
      </FormRow>
    </Form>
  );
}

DepositForm.propTypes = {
  depositingUser: PropTypes.object,
  onCloseModal: PropTypes.function,
};

export default DepositForm;
