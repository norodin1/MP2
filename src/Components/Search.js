import { Container, Button, Form, InputGroup } from "react-bootstrap";
import { useState, useEffect } from "react";

export const Search = ({ onChangeSearch }) => {
  const [searchText, setSearchText] = useState("");
  function handleOnChange(event) {
    setSearchText(event.target.value.toLowerCase());
  }
  function onClear() {
    document.getElementById("searchInput").value = "";
    setSearchText("");
  }
  return (
    <Container>
      <h4 className="text-center mb-3"> Go! Search your PokeMon..</h4>
      <InputGroup>
        <Form.Control
          id="searchInput"
          type="text"
          placeholder="Pokemmon name.."
          onChange={handleOnChange.bind(this)}
        />
        <Button
          id="searchBtn"
          type="submit"
          variant="outline-warning"
          onClick={() => {
            onChangeSearch(searchText);
          }}
        >
          Search
        </Button>
        <Button id="clear" variant="outline-warning" onClick={onClear}>
          Clear
        </Button>
      </InputGroup>
    </Container>
  );
};
