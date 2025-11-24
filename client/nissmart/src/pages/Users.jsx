import Heading from "../ui/Heading";
import Row from "../ui/Row";
import UserTable from "../features/users/UsersTable";
import AddUser from "../features/users/AddUser";

function Users() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Users: Select User To View Their Transaction History</Heading>
      </Row>
      <Row>
        <AddUser />
        <UserTable />
      </Row>
    </>
  );
}

export default Users;
