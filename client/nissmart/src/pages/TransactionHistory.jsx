import Heading from "../ui/Heading";
import Row from "../ui/Row";
import TransactionTable from "../features/transactions/TransactionTable";
import { useNavigate, useParams } from "react-router-dom";
import ButtonText from "../ui/ButtonText";

function Transfers() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Transaction History for User: ID {id}</Heading>
        <Row>
          <ButtonText onClick={() => navigate("/users")}>
            &larr; Back
          </ButtonText>
        </Row>
      </Row>

      <Row>
        <TransactionTable id={id} />
      </Row>
    </>
  );
}

export default Transfers;
