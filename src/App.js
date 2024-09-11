import { NavComponent } from "./Components/NavComponent";
import { Header } from "./Components/Header";
import { Search } from "./Components/Search";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { PokemonList } from "./Components/PokemonList";
import { useState, useEffect } from "react";
import { FooterComponent } from "./Components/FooterComponent";
function App() {
  const [search, setSearch] = useState("");
  const [pokemonList, setProducts] = useState([]);
  const [pokemonListCopy, setProductsCopy] = useState([]);
  const MAX_POKEMON = 100;

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

  useEffect(() => {
    if (pokemonList.length > 0) {
      const fetchDetails = async () => {
        const updatedPokemonList = await Promise.all(
          pokemonList.map(async (pokemon) => {
            const pokemonID = pokemon.url.split("/")[6];
            const details = await getDetails(pokemonID);
            return { ...pokemon, details };
          })
        );
        setProducts(updatedPokemonList);
      };

      fetchDetails();
    }
  }, [pokemonList]);
  if (pokemonList.length > 0) {
  }
  function onChangeSearch(search) {
    setSearch(search);
    if (search) {
      const filtered = pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().startsWith(search)
      );
      setProductsCopy(filtered);
      // console.warn(pokemonListCopy);
    }
  }
  return (
    <>
      <NavComponent />
      <Header />
      <Search onChangeSearch={onChangeSearch} />
      <PokemonList pokemonList={search ? pokemonListCopy : pokemonList} />
      <FooterComponent></FooterComponent>
    </>
  );
}

export default App;
