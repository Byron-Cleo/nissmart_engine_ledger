import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listUsers } from "../../actions/userActions";

import Spinner from "../../ui/Spinner";
import TransferRow from "./TransferRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

function TransfersTable() {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, users } = userList;
  //   const { loading, error, users } = userList;

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  if (loading) return <Spinner />;
  if (!users.length) return <Empty resourceName="users" />;

  return (
    <Menus>
      <Table columns="0.5fr 1fr 1fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>User ID</div>
          <div>First Name</div>
          <div>Last Name</div>
          <div>Your Wallet Balance</div>
          <div>Transfer</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={users}
          render={(user) => <TransferRow user={user} key={user.id}></TransferRow>}
        />
      </Table>
    </Menus>
  );
}

export default TransfersTable;
