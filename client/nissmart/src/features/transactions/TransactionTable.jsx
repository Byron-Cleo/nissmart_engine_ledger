import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { transactionHistoryDetails } from "../../actions/transactionsActions";
import PropTypes from "prop-types";

import Spinner from "../../ui/Spinner";
import TransactionRow from "./TransactionRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useState } from "react";

function TransactionTable({ id }) {
  const dispatch = useDispatch();

  const [loadingTransactionHistory, setLoadingTransactionHistory] =
    useState(true);
  const [transHistory, setTransHistory] = useState({});
  const userTransHistory = useSelector((state) => state.transactionHistory);
  const { loading, success, transactionHistory } = userTransHistory;

  useEffect(() => {
    if (loadingTransactionHistory) {
      dispatch(transactionHistoryDetails(id));
    }
    if(success){
      setLoadingTransactionHistory(false);
      setTransHistory(transactionHistory);
    }
  }, [dispatch, id, loadingTransactionHistory, success, transactionHistory]);

  if (loading) return <Spinner />;
  if (!transHistory.length) return <Empty resourceName="transactions" />;

  return (
    <Menus>
      <Table columns="0.5fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Trans. Id</div>
          <div>First Name</div>
          <div>Last Name</div>
          <div>Trans. Amt</div>
          <div>Initial Amt.</div>
          <div>Wallet Bal.</div>
          <div>Trans. Type</div>
          <div>Trans. Status</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={transHistory}
          render={(transHistory) => <TransactionRow transHistory={transHistory} key={transHistory.id}></TransactionRow>}
        />
      </Table>
    </Menus>
  );
}

TransactionTable.propTypes = {
  id: PropTypes.number,
};

export default TransactionTable;
