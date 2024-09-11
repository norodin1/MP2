import { Container, Card } from "react-bootstrap";

export const PokemonList = ({ pokemonList }) => {
  return (
    <Container className="mt-5">
      <Container className="row justify-content-center">
        {pokemonList.map((pokemon, key) => {
          return (
            <Card style={{ width: "16rem" }} key={key} className="m-3">
              <Card.Img
                variant="top"
                style={{ height: "10rem" }}
                className="m-2"
                src={
                  pokemon?.details?.sprites?.other?.dream_world?.front_default
                }
              />
              <Card.Body>
                <Card.Title className="text-center">
                  {pokemon?.details?.name.toUpperCase()}
                </Card.Title>
                <Card.Text>
                  <span>Element: {pokemon?.details?.types[0]?.type?.name}</span>
                </Card.Text>
                <Card.Text>
                  <span>
                    Ability:{" "}
                    {pokemon?.details?.abilities
                      ?.map((x) => x.ability.name)
                      ?.join(", ")}
                  </span>
                </Card.Text>
                <Card.Text>
                  <span>Height: {pokemon?.details?.height}ft</span>
                </Card.Text>
                <Card.Text>
                  <span>Weight: {pokemon?.details?.weight}kg</span>
                </Card.Text>
              </Card.Body>
            </Card>
          );
        })}
      </Container>
      {pokemonList?.length === 0 && (
        <Container className="notFound-wraper">
          <div className="text-center h1">Search Not Found!</div>
        </Container>
      )}
    </Container>
  );
};
