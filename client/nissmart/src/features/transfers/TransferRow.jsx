import styled from "styled-components";
import PropTypes from "prop-types";
import TransferFundsBtn from "../transfers/TransferButton";

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

const WalletBal = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";

  color: ${({ walletBal }) =>
    walletBal === "walletBal" ? "#db1212" :
    ""};
`;

function TransferRow({ user }) {
  const { id, firstName, lastName, wallet } = user;

  return (
    <>
      <TableRow role="row">
        <div></div>
        <UserDetail>{id}</UserDetail>
        <UserDetail>{firstName}</UserDetail>
        <UserDetail>{lastName}</UserDetail>
        <WalletBal walletBal="walletBal">KSh: {wallet?.walletBalance}</WalletBal>
        <div>
          <TransferFundsBtn user={user} />
        </div>
      </TableRow>
    </>
  );
}

TransferRow.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    wallet: PropTypes.shape({
      walletBalance: PropTypes.string.isRequired,
    }),
  }),
};

export default TransferRow;
