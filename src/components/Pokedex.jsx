import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PokemonCard from './PokemonCard';
import { useNavigate } from 'react-router-dom'
import pokedexicon from '../images/pokedexicon.png';

const Pokedex = () => {

  //  React
  const [ pokemons, setPokemons ] = useState([]);
  const [ types, setTypes ] = useState([]);
  const [ pokemonInput, setPokemonInput ] = useState('');
  //  React Router DOM
  const navigate = useNavigate();
  //  Redux
  const user = useSelector((state) => state.user)

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon')
      .then(res => setPokemons(res.data.results));

    axios.get('https://pokeapi.co/api/v2/type/')
    .then(res => setTypes(res.data.results))
  }, [])

  const searchPokemonByName = (e) => {
    e.preventDefault();
    navigate(`/pokedex/${pokemonInput.toLowerCase()}`)
  }

  const filterByType = (e) => {
    axios.get(e.target.value)
      .then(res => setPokemons(res.data.pokemon))
  }

  return (
    <div className='pokedex-container'>
      <div className="pokedex-title">        
        <img src={pokedexicon} alt=""/>
        <h1>Pokedex</h1>
      </div>
      <div className="pokedex-menu">
        <div className="pokedex-description">
          <p>Welcome <b>{user}</b>! This is your Pokedex.</p>
        </div>

        <form onSubmit={searchPokemonByName}>
          <input
            type="text"
            placeholder='Type a Pokemon name'
            onChange={e => setPokemonInput(e.target.value)}
            value={pokemonInput}
          />
          <button>
            <i className='bx bxs-right-arrow' ></i>
          </button>
        </form>

        <select onChange={filterByType}>
          <option value="">Types</option>
          {types.map(type => (
            <option value={type.url} key={type.name}>
              {type.name}
            </option>
          ))
          }
        </select>
      </div>
      
      <div className="pokemons-list-container">
        <ul className='pokemons-list'>
          {pokemons.map(pokemon => (
            <PokemonCard
              pokemon={pokemon.url ? pokemon.url : pokemon.pokemon.url}
              key={pokemon.url ? pokemon.url : pokemon.pokemon.url}
            />
          ))
          }
        </ul>
      </div>
    </div>
  );
};

export default Pokedex;