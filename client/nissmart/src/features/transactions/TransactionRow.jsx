import styled from "styled-components";
import PropTypes from "prop-types";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
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
    walletBal === "currentBalance" ? "#F27030" :
    ""};
`;

const TransTypeDetail = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: "#374151";
  font-family: "Sono";
  border-radius: 5px;
  padding: 3px;;

  color: ${({ transType }) =>
    transType === "deposit" ? "#2D9A48" :
    transType === "withdraw" ? "#BF0413" :
    transType === "transfer_credit" ? "#3FC0CC" :
    transType === "transfer_debit" ? "#833AA8" :
    ""};
`;

const StatusTypeDetail = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
  border-radius: 5px;
  padding: 3px;;

  background-color: ${({ transStatus }) =>
    transStatus === "completed" ? "#2D9A48" :
    transStatus === "failed" ? "#BF0413" :
    transStatus === "peding" ? "#6D985E" :
    ""};

  
`;

function TransactionRow({ transHistory }) {
  const { id, amount, initialBalance, currentBalance, transactionType, transactionStatus, user } = transHistory;

  return (
    <>
      <TableRow role="row">
        <div></div>
        <UserDetail>{id}</UserDetail>
        <UserDetail>{user?.firstName}</UserDetail>
        <UserDetail>{user?.lastName}</UserDetail>
        <UserDetail>{amount}</UserDetail>
        <UserDetail>{initialBalance}</UserDetail>
        <WalletBal walletBal="currentBalance">{currentBalance}</WalletBal>
        <TransTypeDetail transType={transactionType}>{transactionType}</TransTypeDetail>
        <StatusTypeDetail transStatus={transactionStatus}>{transactionStatus}</StatusTypeDetail>
        <div></div>
      </TableRow>
    </>
  );
}

TransactionRow.propTypes = {
  transHistory: PropTypes.shape({
    id: PropTypes.number,
    amount: PropTypes.string.isRequired,
    initialBalance: PropTypes.string.isRequired,
    currentBalance: PropTypes.string.isRequired,
    transactionType: PropTypes.string.isRequired,
    transactionStatus: PropTypes.string.isRequired,
    user: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    }),
  }),
};

export default TransactionRow;
