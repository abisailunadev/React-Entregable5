import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const PokemonDetailed = () => {

  //  React
  const [ pokemonDetails, setPokemonDetails ] = useState([]);
  //  React Router DOM
  const { pokeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
      .then(res => setPokemonDetails(res.data))
  }, [])

  console.log(pokemonDetails);

  return (
    <div className='pokemon-details'>
      <h1>Pokemon Detailed</h1>
      <button onClick={() => navigate('/pokedex')}>Go back</button>
      <p>{pokemonDetails.name}</p>
      <img src={pokemonDetails.sprites?.other.home.front_default} alt="pokemon" />
    </div>
  );
};

export default PokemonDetailed;