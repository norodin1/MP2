import { Container, Button, Form, InputGroup } from "react-bootstrap";

export const Search = () => {
  return (
    <Container>
      <h4 className="text-center mb-3"> Go! Search your PokeMon..</h4>
      <InputGroup>
        <Form.Control placeholder="Pokemmon name.." />
        <Button variant="outline-warning">Search</Button>
        <Button variant="outline-warning">Clear</Button>
      </InputGroup>
    </Container>
  );
};
