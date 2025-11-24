import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listUsers } from "../../actions/userActions";

import Spinner from "../../ui/Spinner";
import UserRow from "./UserRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

function UserTable() {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, users } = userList;

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  if (loading) return <Spinner />;
  if (!users.length) return <Empty resourceName="users" />;

  return (
    <Menus>
      <Table columns="0.5fr 1fr 1fr 1fr 1fr 1fr 0.2fr">
        <Table.Header>
          <div></div>
          <div>User ID</div>
          <div>First Name</div>
          <div>Last Name</div>
          <div>Email</div>
          <div>Actions</div>
        </Table.Header>
        <Table.Body
          data={users}
          render={(user) => <UserRow user={user} key={user.id}></UserRow>}
        />
      </Table>
    </Menus>
  );
}

export default UserTable;
