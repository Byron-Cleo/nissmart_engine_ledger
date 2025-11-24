import styled from "styled-components";
import Heading from "./Heading";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
`;

function Header() {
  return (
    <StyledHeader>
      <Heading as="h3">Nissmart Project: Fund Transaction Engine</Heading>
    </StyledHeader>
  );
}

export default Header;
