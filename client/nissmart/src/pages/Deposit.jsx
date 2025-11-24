import Heading from "../ui/Heading";
import Row from "../ui/Row";
import DepositsTable from "../features/deposits/DepositsTable";

function Deposits() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Select a User to Simulate Deposit Funds(DEPOSIT MONEY)</Heading>
      </Row>
      <Row>
        <DepositsTable />
      </Row>
    </>
  );
}

export default Deposits;
