import Heading from "../ui/Heading";
import Row from "../ui/Row";
import TransfersTable from "../features/transfers/TransfersTable";

function Transfers() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">
          Select a User to Simulate Internal Funds Trasfer(SENDING MONEY)
        </Heading>
      </Row>
      <Row>
        <TransfersTable />
      </Row>
    </>
  );
}

export default Transfers;
