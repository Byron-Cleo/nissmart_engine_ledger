import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { listUsers, updateUserDetails } from "../../actions/userActions";
import { createUser } from "../../actions/userActions";
import {
  USER_CREATE_RESET,
  USER_UPDATE_RESET,
} from "../../constants/userConstants";
import PropTypes from "prop-types";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";

function CreateEditUserForm({ userToEdit = {}, onCloseModal }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [edittingUser, setEdittingUser] = useState(false);
  const [edittedUserId, setEdittedUserId] = useState(false);
  const [message, setMessage] = useState(null);

  const userCreate = useSelector((state) => state.userCreate);
  const { loading, success } = userCreate;

  const updatedUser = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    // error: errorUpdate,
    successUpdate,
  } = updatedUser;
  const isworking = loading || loadingUpdate;

  useEffect(() => {
    //if user created successfully redirect to list page
    if (success) {
      dispatch({ type: USER_CREATE_RESET });
      toast.success("New User successfully created");
      onCloseModal?.();
      dispatch(listUsers());
      navigate("/users");
    }
  }, [dispatch, success, onCloseModal, navigate]);

  useEffect(() => {
    //if user updated successfully redirect to list page
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      toast.success("User updated successfully");
      onCloseModal?.();
      dispatch(listUsers());
      navigate("/users");
    } else {
      //getting values from the object for editting
      const { id: editId, firstName, lastName, email } = userToEdit;
      setEdittedUserId(editId);
      const isEditSession = Boolean(editId);

      setEdittingUser(isEditSession);
      if (isEditSession) {
        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
      } else {
        console.log("=======GET USER DETAILS========");
      }
    }
  }, [dispatch, userToEdit, navigate, successUpdate, onCloseModal]);

  const userCreateHandler = (e) => {
    e.preventDefault();
    if (edittingUser) {
      const user = {
        edittedUserId,
        firstName,
        lastName,
        email,
      };
      dispatch(updateUserDetails(user));
    } else {
      if (firstName.length < 3) {
        setMessage("Please Confirm First Name");
      } else {
        const user = {
          firstName,
          lastName,
          email,
        };
        dispatch(createUser(user));
      }
    }
  };

  return (
    <Form
      onSubmit={userCreateHandler}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="First Name" error={message}>
        <Input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          disabled={isworking}
        />
      </FormRow>
      <FormRow label="Last Name" error={message}>
        <Input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          disabled={isworking}
        />
      </FormRow>
      <FormRow label="Email" error={message}>
        <Input
          type="text"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          disabled={isworking}
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

        <Button disabled={isworking}>
          {edittingUser ? "Edit User" : "Create new User"}
        </Button>
      </FormRow>
    </Form>
  );
}

CreateEditUserForm.propTypes = {
  userToEdit: PropTypes.object,
  onCloseModal: PropTypes.function,
};

export default CreateEditUserForm;
