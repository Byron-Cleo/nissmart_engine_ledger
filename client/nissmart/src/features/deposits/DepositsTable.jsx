import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listUsers } from "../../actions/userActions";

import Spinner from "../../ui/Spinner";
import DepositRow from "./DepositRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

function DepositsTable() {
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
          <div>Deposit</div> 
          <div></div>
        </Table.Header>
        <Table.Body
          data={users}
          render={(user) => <DepositRow user={user} key={user.id}></DepositRow>}
        />
      </Table>
    </Menus>
  );
}

export default DepositsTable;
