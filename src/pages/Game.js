import { NavComponent } from "../Components/NavComponent";
import { Header } from "../Components/Header";
import { Button, Container, Card } from "react-bootstrap";
import { FooterComponent } from "../Components/FooterComponent";
import { useState, useEffect } from "react";

export const Game = () => {
  const [usedPokemonIds, setUsedPokemonIds] = useState([]);
  const [options, setOptions] = useState([]); // Stores Pokemon names
  const [pokemonData, setPokemonData] = useState(null);
  const [feedback, setFeedback] = useState("Who's that Pokemon?!"); // Feedback message (correct or incorrect)
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showImage, setshowImage] = useState("hideImage");
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);

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
    return Math.floor(Math.random() * 100) + 1;
  }

  // Function to shuffle an array
  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  // Load Pokémon data when the component mounts
  useEffect(() => {
    const loadNewPokemonSet = async () => {
      // Reset feedback and selected answer
      setFeedback("Who's that Pokemon?!");
      setPokemonData(null);
      setSelectedAnswer(null);
      setshowImage("hideImage");
      const usedPokemonIds = [];
      // Get a new random Pokemon ID that hasn't been used
      let pokemonId = getRandomPokemonId();
      while (usedPokemonIds.includes(pokemonId)) {
        pokemonId = getRandomPokemonId();
      }

      // Fetch the Pokémon data
      const pokemon = await fetchPokemonById(pokemonId);
      setPokemonData(pokemon); // Set the fetched Pokemon data
      // console.log(pokemon.name);
      usedPokemonIds.push(pokemonId);
      // setUsedPokemonIds((prevUsedIds) => [...prevUsedIds, pokemonId]); // Track used Pokemon IDs
      setOptions([pokemon.name]); // Start options with the correct Pokémon's name

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

      setRound(1);
      setUsedPokemonIds(usedPokemonIds);
    };
    loadNewPokemonSet(); // Call the function to load Pokémon options
  }, []); // Empty dependency array ensures this runs once on mount

  // Function to load new Pokémon and options
  const loadNewPokemonSet = async () => {
    // Reset feedback and selected answer
    setFeedback("Who's that Pokemon?!");
    setPokemonData(null);
    setSelectedAnswer(null);
    setshowImage("hideImage");

    // Get a new random Pokemon ID that hasn't been used
    let pokemonId = getRandomPokemonId();
    while (usedPokemonIds.includes(pokemonId)) {
      pokemonId = getRandomPokemonId();
    }

    // Fetch the Pokémon data
    const pokemon = await fetchPokemonById(pokemonId);
    setPokemonData(pokemon); // Set the fetched Pokemon data
    // console.log(pokemon.name);
    setUsedPokemonIds((prevUsedIds) => [...prevUsedIds, pokemonId]); // Track used Pokemon IDs
    setOptions([pokemon.name]); // Start options with the correct Pokémon's name

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

    setRound(round + 1);
  };
  // console.log(options);

  // Function to handle answer selection
  function handleSelectAnswer(option) {
    setSelectedAnswer(option);
    // console.log(pokemonData.name);
    if (option === pokemonData.name) {
      setFeedback("Correct!");
      setScore(score + 1);
      setshowImage("showImage");
    } else {
      setFeedback("Incorrect!");
      setshowImage("showImage");
    }
    setTimeout(() => {
      loadNewPokemonSet(); // Load a new set after a short delay
    }, 2000); // 2-second delay before loading new Pokémon
  }
  // console.log(selectedAnswer, pokemonData?.name);

  return (
    <>
      <NavComponent />
      <Header />
      <Container>
        <h2 className="text-center mt-3">{feedback}</h2>
        <Container>
          <Container className="PokeImage-wraper d-flex justify-content-center mt-5">
            <img
              alt="PokeImage"
              src={pokemonData?.sprites?.other?.dream_world?.front_default}
              className={showImage}
              id="PokeImage"
            ></img>
          </Container>
        </Container>
        <Container className="row justify-content-center m-3">
          {options.map((option, index) => (
            <Button
              variant="light"
              key={index}
              className={
                "col-6 col-sm-4 m-1 " +
                (selectedAnswer === option
                  ? feedback === "Correct!"
                    ? "correct"
                    : "wrong"
                  : "")
              }
              onClick={() => handleSelectAnswer(option)}
            >
              {option.toUpperCase()}
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
            Points: <span id="pointsValue">{score}</span>/
            <span id="totalCount">{round}</span>
          </h4>
        </Container>
      </Container>
      <FooterComponent />
    </>
  );
};
