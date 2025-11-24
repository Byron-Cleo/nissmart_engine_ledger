import Heading from "../ui/Heading";
import Row from "../ui/Row";
import WithdrawsTable from "../features/withdraws/WithdrawsTable";

function Withdraws() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Select a User to Simulate Them WithdraW Funds(WITHDRAW MONEY)</Heading>
      </Row>
      <Row>
        <WithdrawsTable />
      </Row>
    </>
  );
}

export default Withdraws;
