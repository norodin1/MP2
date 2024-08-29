import { useState, useEffect } from "react";
import { Container, Card } from "react-bootstrap";

export const PokemonList = () => {
  const [pokemonList, setProducts] = useState([]);
  const MAX_POKEMON = 5;
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`)
      .then((response) => response.json())
      .then((data) => setProducts(data.results));
  }, []);
  async function getDetails(id) {
    try {
      const pokemon = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      ).then((res) => res.json());
      return pokemon;
    } catch (error) {
      console.error("Failed to fetch Pokemon data before redirect");
    }
  }
  if (pokemonList) {
    pokemonList.forEach((pokemon, i) => {
      const pokemonID = pokemon.url.split("/")[6];
      getDetails(pokemonID).then((details) => {
        const pokemonDetails = details;
        pokemonList[i]["details"] = pokemonDetails;
      });
    });
  }
  console.log(pokemonList);

  return (
    <Container>
      <Container>
        <div>PokemonList</div>
      </Container>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};
