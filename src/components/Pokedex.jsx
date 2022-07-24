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
  const [ pokemonIndex, setPokemonIndex ] = useState(0);
  const [ showButtons, setShowButtons ] = useState(true);
  //  React Router DOM
  const navigate = useNavigate();
  //  Redux
  const user = useSelector((state) => state.user)

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${pokemonIndex}`)
      .then(res => setPokemons(res.data.results));

    axios.get('https://pokeapi.co/api/v2/type/')
    .then(res => setTypes(res.data.results))
  }, [])

  const searchPokemonByName = (e) => {
    e.preventDefault();
    navigate(`/pokedex/${pokemonInput.toLowerCase()}`)
  }

  const filterByType = (e) => {
    if(e.target.value !== 'https://pokeapi.co/api/v2/pokemon'){
      axios.get(e.target.value)
        .then(res => {
          setPokemons(res.data.pokemon)
          setShowButtons(false)
        })
    }else{
      axios.get(e.target.value)
      .then(res => {
        setPokemons(res.data.results)
        setShowButtons(true)
      })
    }
  }

  const previousPage = () => {
    setPokemonIndex(pokemonIndex - 20)
    window.scrollTo(0, 0);
  }

  const nextPage = () => {
    setPokemonIndex(pokemonIndex + 20)
    window.scrollTo(0, 0);
  }

  const paginationSubmit = (e) => {
    e.preventDefault();
    axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${pokemonIndex}`)
    .then(res => setPokemons(res.data.results));
  }

  const paginationButtons = () => {
    if(pokemonIndex > 0 && showButtons === true){
      return(
        <div className="n-p-btns-container">
        <form onSubmit={paginationSubmit}>
          <button onClick={previousPage}>
            <i className='bx bxs-chevron-left bx-xs' ></i>
          </button>
          <button onClick={nextPage}>
            <i className='bx bxs-chevron-right bx-xs' ></i>
          </button>
        </form>
      </div>
      )
    }else if(pokemonIndex <= 0 && showButtons === true ){
      return(
        <div className="n-p-btns-container one-btn">
        <form onSubmit={paginationSubmit}>
          <button onClick={nextPage}>
            <i className='bx bxs-chevron-right bx-xs' ></i>
          </button>
        </form>
      </div>
      )
    }
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

        <div className="select-container">
          <p><b>Type</b>:</p>
          <select onChange={filterByType}>
            <option value="https://pokeapi.co/api/v2/pokemon">All</option>
            {types.map(type => (
              <option value={type.url} key={type.name}>
                {type.name[0].toUpperCase() + type.name.substring(1)}
              </option>
            ))
            }
          </select>
        </div>
      </div>
      
      <div className="pokemons-list-container">
        {paginationButtons()}
        <ul className='pokemons-list'>
          {pokemons.map(pokemon => (
            <PokemonCard
              pokemon={pokemon.url ? pokemon.url : pokemon.pokemon.url}
              key={pokemon.url ? pokemon.url : pokemon.pokemon.url}
            />
          ))
          }
        </ul>
        {paginationButtons()}
      </div>
    </div>
  );
};

export default Pokedex;