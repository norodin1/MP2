import { NavComponent } from "../Components/NavComponent";
import { Header } from "../Components/Header";
import { Button, Container, Card } from "react-bootstrap";
import { FooterComponent } from "../Components/FooterComponent";
import { useState, useEffect } from "react";

export const Game = () => {
  const [usedPokemonIds, setUsedPokemonIds] = useState([]);
  const [options, setOptions] = useState([]); // Stores Pokemon names
  const [optionsIds, setOptionsIds] = useState([]); // Stores Pokemon IDs
  const [pokemonData, setPokemonData] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState([]); // Stores the user's selected answer
  const [feedback, setFeedback] = useState(""); // Feedback message (correct or incorrect)

  // Function to fetch Pokémon data by ID
  async function fetchPokemonById(pokemonId) {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
  }

  // Function to get a random Pokémon ID
  function getRandomPokemonId() {
    return Math.floor(Math.random() * 50) + 1;
  }

  // Function to shuffle an array
  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  // Load Pokémon data when the component mounts
  useEffect(() => {
    loadNewPokemonSet(); // Call the function to load Pokémon options
  }, []); // Empty dependency array ensures this runs once on mount

  // Function to load new Pokémon and options
  const loadNewPokemonSet = async () => {
    // Reset feedback and selected answer
    setFeedback("");
    setSelectedAnswer(null);
    setPokemonData(null);
    // setOptions(null);

    // Get a new random Pokemon ID that hasn't been used
    let pokemonId = getRandomPokemonId();
    while (usedPokemonIds.includes(pokemonId)) {
      pokemonId = getRandomPokemonId();
    }

    // Fetch the Pokémon data
    const pokemon = await fetchPokemonById(pokemonId);
    setPokemonData(pokemon); // Set the fetched Pokemon data

    console.log(pokemon.name);
    setUsedPokemonIds((prevUsedIds) => [...prevUsedIds, pokemonId]); // Track used Pokemon IDs
    setOptions([pokemon.name]); // Start options with the correct Pokémon's name
    setOptionsIds([pokemonId]); // Track options IDs

    // Fetch more random Pokémon to create 4 options
    const newOptions = [pokemon.name];
    const newOptionsIds = [pokemonId];

    while (newOptions.length < 4) {
      let randomPokemonId = getRandomPokemonId();

      // Ensure we don't reuse the same random ID
      while (newOptionsIds.includes(randomPokemonId)) {
        randomPokemonId = getRandomPokemonId();
      }

      // Fetch random Pokémon by new ID
      const randomPokemon = await fetchPokemonById(randomPokemonId);

      // Add new Pokémon to options and IDs
      newOptions.push(randomPokemon.name);
      newOptionsIds.push(randomPokemonId);
    }
    // console.log(newOptions);

    // Shuffle the options to randomize their order
    setOptions(shuffleArray(newOptions));
    setOptionsIds(newOptionsIds); // Save the final IDs for future reference
  };
  console.log(options);

  // Function to handle answer selection
  function handleSelectAnswer(option) {
    checkAnswer(option);
    console.log(pokemonData.name);
    setTimeout(() => {
      loadNewPokemonSet(); // Load a new set after a short delay
    }, 2000); // 2-second delay before loading new Pokémon
  }
  function checkAnswer(option) {
    console.warn(option, pokemonData.name);

    if (option === pokemonData.name) {
      setFeedback("Correct!");
    } else {
      setFeedback("Incorrect");
    }

    // Generate new set of Pokémon and options after checking the answer
  }

  // Function to check if the selected answer is correct

  return (
    <>
      <NavComponent />
      <Header />
      <Container>
        <h2 className="text-center mt-3">{feedback}</h2>
        <Container className="d-flex justify-content-center mt-5">
          <img
            alt="PokeImage"
            src={pokemonData?.sprites?.other?.dream_world?.front_default}
          ></img>
        </Container>
        <Container className="row justify-content-center m-3">
          {options.map((option, index) => (
            <Button
              key={index}
              className="col-6 col-sm-4 m-1 "
              onClick={() => handleSelectAnswer(option)}
              // style={{
              //   backgroundColor: selectedAnswer === option ? "#ddd" : "#fff",
              // }}
            >
              {option}
            </Button>
          ))}
        </Container>

        <Container className="d-flex justify-content-center m-3">
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title className="text-center">Hints!</Card.Title>

              <Card.Text className="text-start">
                <span>Type: </span>
                <strong id="hint-element">
                  {pokemonData?.types[0]?.type?.name.toUpperCase()}
                </strong>
              </Card.Text>
              <Card.Text className="text-start">
                <span>Ability: </span>
                <strong id="hint-ability">
                  {" "}
                  {pokemonData?.abilities
                    ?.map((x) => x.ability.name.toUpperCase())
                    ?.join(", ")}
                </strong>
              </Card.Text>
            </Card.Body>
          </Card>
        </Container>
        <Container className="m-3">
          <h4 id="points" className="text-center">
            Points: <span id="pointsValue">0</span>/
            <span id="totalCount">0</span>
          </h4>
        </Container>
      </Container>
      <FooterComponent />
    </>
  );
};
