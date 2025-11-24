import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateUserForm from "./CreateUserForm";

function AddUser() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="user-create-form">
          <Button>Add new User</Button>
        </Modal.Open>
        <Modal.Window name="user-create-form">
          <CreateUserForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddUser;
