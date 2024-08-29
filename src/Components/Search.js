import { Container, Button, Form, InputGroup } from "react-bootstrap";

export const Search = () => {
  return (
    <Container>
      <h4 className="text-center mb-3"> Go! Search your PokeMon..</h4>
      <InputGroup>
        <Form.Control
          id="searchInput"
          type="text"
          placeholder="Pokemmon name.."
        />
        <Button id="searchBtn" type="submit" variant="outline-warning">
          Search
        </Button>
        <Button id="clear" variant="outline-warning">
          Clear
        </Button>
      </InputGroup>
    </Container>
  );
};
