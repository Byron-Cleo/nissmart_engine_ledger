import styled from "styled-components";
import PropTypes from "prop-types";
// import DepositForm from "./DepositForm";
// import { HiPencil } from "react-icons/hi2";
// import Modal from "../../ui/Modal";
// import Menus from "../../ui/Menus";
import DepositFundsBtn from "../deposits/DepositFundsButton";


const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr 1fr 1fr 1fr 1fr;
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

function DepositRow({ user }) {

  const { id, firstName, lastName } = user;
  // const { id, firstName, lastName, email } = user;

  return (
    <>
      <TableRow role="row">
        <div></div>
        <UserDetail>{id}</UserDetail>
        <UserDetail>{firstName}</UserDetail>
        <UserDetail>{lastName}</UserDetail>
        <div><DepositFundsBtn user={user}/></div>
        {/* <UserDetail>{email}</UserDetail> */}
        {/* <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={id} />

              <Menus.List id={id}>
                
                <Modal.Open opens="deposit">
                  <Menus.Button icon={<HiPencil />}>Deposit</Menus.Button>
                </Modal.Open>
              </Menus.List>

              <Modal.Window name="deposit">
                <DepositForm depositingUser={user} />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div> */}
      </TableRow>
    </>
  );
}

DepositRow.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
};

export default DepositRow;
