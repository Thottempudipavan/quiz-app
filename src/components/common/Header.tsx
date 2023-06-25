import Navbar from "react-bootstrap/Navbar";
import styled from "styled-components";

const Header = () => {
  const Container = styled(Navbar.Brand)`
    padding: 0 10px;
    margin: 0 30px;
  `;

  return (
    <Navbar bg="light" variant="light">
      <Container title="QUIZ App" onClick={() => window.location.reload()}>
        Quiz App
      </Container>
    </Navbar>
  );
};

export default Header;
