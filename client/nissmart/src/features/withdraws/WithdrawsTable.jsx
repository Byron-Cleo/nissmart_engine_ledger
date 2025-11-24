import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listUsers } from "../../actions/userActions";

import Spinner from "../../ui/Spinner";
import WithdrawRow from "./WithdrawRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

function WithdrawsTable() {
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
          <div>Withdraw</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={users}
          render={(user) => (
            <WithdrawRow user={user} key={user.id}></WithdrawRow>
          )}
        />
      </Table>
    </Menus>
  );
}

export default WithdrawsTable;
