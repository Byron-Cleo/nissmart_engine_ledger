import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { withdrawCash } from "../../actions/withdrawActions";
import { WITHDRAW_CREATE_RESET } from "../../constants/withdrawConstants";
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

function WithdrawForm({ withdrawingUser = {}, onCloseModal }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [amount, setAmount] = useState("");
  const [wallet, setWallet] = useState({});
  const [withdrawingUserId, setWithdrawingUserId] = useState(null);

  const withdrawAmount = useSelector((state) => state.withdrawFund);
  const { loading, success } = withdrawAmount;

  useEffect(() => {
    if (success) {
      dispatch({ type: WITHDRAW_CREATE_RESET });
      toast.success("Funds Successfully Withdrawn 🎉 🚀");
      onCloseModal?.();
      navigate("/dashboard");
    }

    if (withdrawingUser) {
      const { id, firstName, lastName, wallet } = withdrawingUser;
      setWithdrawingUserId(id);
      setFirstName(firstName);
      setLastName(lastName);
      setWallet(wallet);
    }
  }, [dispatch, withdrawingUser, navigate, success, onCloseModal]);

  const userWithdrawHandler = (e) => {
    e.preventDefault();
    const user = {
      id: withdrawingUserId,
      firstName,
      lastName,
      amount,
    };
    dispatch(withdrawCash(user));
  };

  return (
    <Form
      onSubmit={userWithdrawHandler}
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
      <FormRow label="Amount to Withdraw">
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
          {loading ? "Withdrawing..." : "Withdraw Funds"}
        </Button>
      </FormRow>
    </Form>
  );
}

WithdrawForm.propTypes = {
  withdrawingUser: PropTypes.object,
  onCloseModal: PropTypes.function,
};

export default WithdrawForm;
