import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import CreateUserForm from "./CreateUserForm";
import { HiPencil } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import ButtonText from "../../ui/ButtonText";
import { IoMdCog } from "react-icons/io";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr 1fr 1fr 1fr 1fr 0.2fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const UserDetail = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

function UserRow({ user }) {
  const navigate = useNavigate();

  const { id, firstName, lastName, email } = user;

  return (
    <>
      <TableRow role="row">
        <div></div>
        <UserDetail>{id}</UserDetail>
        <UserDetail>{firstName}</UserDetail>
        <UserDetail>{lastName}</UserDetail>
        <UserDetail>{email}</UserDetail>
        <ButtonText onClick={() => navigate(`/transaction-history/${id}`)}>
          <IoMdCog />{" "}
          View Trans. History
        </ButtonText>

        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={id} />

              <Menus.List id={id}>
                
                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>Edit User</Menus.Button>
                </Modal.Open>
              </Menus.List>

              <Modal.Window name="edit">
                <CreateUserForm userToEdit={user} />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
      </TableRow>
    </>
  );
}

UserRow.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }),
};

export default UserRow;
