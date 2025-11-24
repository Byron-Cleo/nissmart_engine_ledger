import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { transferCash } from "../../actions/transferActions";
import { TRANSFER_CREATE_RESET } from "../../constants/transferConstants";
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

function TransferForm({ sendingUser = {}, onCloseModal }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [amount, setAmount] = useState("");
  const [wallet, setWallet] = useState({});
  const [senindUserId, setSendingUserId] = useState(null);
  const [receiverId, setReceiverId] = useState(null);

  const transferAmount = useSelector((state) => state.transferFund);
  const { loading, success } = transferAmount;

  useEffect(() => {
    if (success) {
      dispatch({ type: TRANSFER_CREATE_RESET });
      toast.success("Funds Successfully Sent(Transfered) 🎉 🚀");
      onCloseModal?.();
      navigate("/dashboard");
    }

    if (sendingUser) {
      const { id, firstName, lastName, wallet } = sendingUser;
      setSendingUserId(id);
      setFirstName(firstName);
      setLastName(lastName);
      setWallet(wallet);
    }
  }, [dispatch, sendingUser, navigate, success, onCloseModal]);

  const userTransferHandler = (e) => {
    e.preventDefault();
    const user = {
      id: senindUserId,
      receiverId,
      firstName,
      lastName,
      amount,
    };
    dispatch(transferCash(user));
  };

  return (
    <Form
      onSubmit={userTransferHandler}
      type={onCloseModal ? "modal" : "regular"}
    >
      <Heading as="h1">
        Your Wallet Balance:<StyledSpan bal="bal">KSh: {wallet?.walletBalance}</StyledSpan>
      </Heading>

      <FormRow label="Sender First Name">
        <Input type="text" id="firstName" value={firstName} readonly />
      </FormRow>
      <FormRow label="Sender Last Name">
        <Input type="text" id="lastName" value={lastName} readonly />
      </FormRow>
      <FormRow label="Receiver's ID as PhoneNumber">
        <Input
          type="number"
          id="receiverId"
          value={receiverId}
          onChange={(e) => {
            setReceiverId(e.target.value);
          }}
          disabled={loading}
        />
      </FormRow>
      <FormRow label="Amount to Send(Transfer)">
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
          {loading ? "Transfering..." : "Send Money"}
        </Button>
      </FormRow>
    </Form>
  );
}

TransferForm.propTypes = {
  sendingUser: PropTypes.object,
  onCloseModal: PropTypes.function,
};

export default TransferForm;
