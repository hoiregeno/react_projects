import React, { useEffect, useRef, useState } from "react";
import { getPokemonInfo } from "../utils/pokemonInfo";
import "../style/PokemonSprite.css";

const PokemonSprite = () => {
  const [pokemon, setPokemon] = useState(null);
  const [newPokemon, setNewPokemon] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const handleNewPokemon = async (e) => {
    e.preventDefault();
    const trimmedPokemon = newPokemon.trim().toLowerCase();

    if (!trimmedPokemon) {
      setErrorMsg("Please enter a pokemon.");
      inputRef.current?.focus();
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${trimmedPokemon}`
      );

      if (!res.ok) {
        inputRef.current?.focus();
        throw new Error(`"${trimmedPokemon}" was not found. Please try again.`);
      }

      const data = await res.json();
      setPokemon(data);
      setNewPokemon("");
    } catch (err) {
      setErrorMsg(err.message);
      inputRef.current?.focus();
    } finally {
      setLoading(false);
    }
  };

  const info = pokemon ? getPokemonInfo(pokemon) : null;
  const { name, type, ability, move, sprite, weight } = info || {};

  return (
    <main className="pokemon-sprite">
      <h1 className="pokemon-sprite__title">Pokemon Sprites</h1>

      <form className="pokemon-sprite__form" onSubmit={handleNewPokemon}>
        <input
          className="pokemon-sprite__input"
          ref={inputRef}
          type="text"
          placeholder="Enter your pokemon"
          value={newPokemon}
          onChange={(e) => setNewPokemon(e.target.value)}
        />
        <button
          className="pokemon-sprite__button"
          type="submit"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {loading && (
        <div className="pokemon-sprite__loading" aria-hidden="true">
          <div className="spinner"></div>
        </div>
      )}

      {errorMsg && (
        <p className="pokemon-sprite__error" role="alert" aria-live="assertive">
          {errorMsg}
        </p>
      )}

      {pokemon && !loading && (
        <section className="pokemon-sprite__info" aria-live="polite">
          <img src={sprite ?? sprite ?? ""} alt={name ?? "pokemon sprite"} />

          <div className="pokemon-sprite__meta-wrapper">
            <h2 className="pokemon-sprite__meta">
              <span className="pokemon-sprite__meta-value">{name}</span>
            </h2>
            <p className="pokemon-sprite__meta">
              Type: <span className="pokemon-sprite__meta-value">{type}</span>
            </p>
            <p className="pokemon-sprite__meta">
              Abilities:
              <span className="pokemon-sprite__meta-value">{ability}</span>
            </p>
            <p className="pokemon-sprite__meta">
              Weight:
              <span>{weight} kg</span>
            </p>
            <p className="pokemon-sprite__meta">
              Top Moves:
              <span className="pokemon-sprite__meta-value">{move}</span>
            </p>
          </div>
        </section>
      )}
    </main>
  );
};

export default PokemonSprite;
