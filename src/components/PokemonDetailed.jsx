import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import pokedexicon from '../images/pokedexicon.png';

const PokemonDetailed = () => {

  //  Colors array
  const colors = [
    {
      id: 'normal',
      color: 'rgb(168, 168, 120)'
    },
    {
      id: 'fighting',
      color: 'rgb(192, 48, 40)'
    },
    {
      id: 'flying',
      color: 'rgb(168, 144, 240)'
    },
    {
      id: 'poison',
      color: 'rgb(160, 64, 160)'
    },
    {
      id: 'ground',
      color: 'rgb(224, 192, 104)'
    },
    {
      id: 'rock',
      color: 'rgb(184, 160, 56)'
    },
    {
      id: 'bug',
      color: 'rgb(168, 184, 32)'
    },
    {
      id: 'ghost',
      color: 'rgb(112, 88, 152)'
    },
    {
      id: 'steel',
      color: 'rgb(184, 184, 208)'
    },
    {
      id: 'fire',
      color: 'rgb(240, 128, 48)'
    },
    {
      id: 'water',
      color: 'rgb(104, 144, 240)'
    },
    {
      id: 'grass',
      color: 'rgb(120, 200, 80)'
    },
    {
      id: 'electric',
      color: 'rgb(248, 208, 48)'
    },
    {
      id: 'psychic',
      color: 'rgb(248, 88, 136)'
    },
    {
      id: 'ice',
      color: 'rgb(152, 216, 216)'
    },
    {
      id: 'dragon',
      color: 'rgb(112, 56, 248)'
    },
    {
      id: 'dark',
      color: 'rgb(112, 88, 72)'
    },
    {
      id: 'fairy',
      color: 'rgb(238, 153, 172)'
    },
    {
      id: 'unknown',
      color: 'rgb(104, 160, 144)'
    },
  ]

  //  React
  const [ pokemonDetails, setPokemonDetails ] = useState([]);
  const [ moves, setMoves ] = useState([]);
  //  React Router DOM
  const { pokeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
      .then(res => {
        setPokemonDetails(res.data)
        setMoves(res.data.moves)
      })
  }, [])

  console.log(pokemonDetails);

  const setColor = () => {
    for(let i in colors){
      if(colors[i].id === pokemonDetails.types?.[0].type.name){
        return colors[i].color
      }
    }
  };

  //  Javascript
  const pokemonName = pokemonDetails.name?.[0].toUpperCase() + pokemonDetails.name?.substring(1)
  const firstType = pokemonDetails.types?.[0]?.type?.name
  const secondType = pokemonDetails.types?.[1]?.type?.name
  const firstTypeFixed = firstType?.[0].toUpperCase() + firstType?.substring(1)
  const secondTypeFixed = secondType?.[0].toUpperCase() + secondType?.substring(1)
  const pHeight = (pokemonDetails.height / 10)
  const pWeight = (pokemonDetails.weight / 10)

  return (
    <div className='pokemon-details-container'>
      <div className="pokedex-title">        
        <img src={pokedexicon} alt=""/>
        <h1>Pokedex</h1>
      </div>
      <div className="full-pokemon-container">
        <button onClick={() => navigate('/pokedex')}>
          <i className='bx bxs-chevron-left bx-xs' ></i>
        </button>
        <div className="pokemon-details-card" style={{backgroundColor: setColor()}}>
          <img src={pokemonDetails.sprites?.other.home.front_default} alt="pokemon" />
          <div className="p-d-info">
            <div className="p-d-pname">
              <p><b>{pokemonName}</b></p>
            </div>
            <div className="p-d-type">
              <div className="p-d-type-title">
                <p><b>Type</b></p>
              </div>
              <div className="p-d-type-info">
                <p>{pokemonDetails.types?.[1] ? `${firstTypeFixed} | ${secondTypeFixed}` : firstTypeFixed}</p>
              </div>
            </div>
            <div className="p-d-hnw">
              <div className="p-d-height">
                <p><b>Height</b></p>
                <p>{pHeight} m</p>
              </div>
              <div className="p-d-weight">
                <p><b>Weight</b></p>
                <p>{pWeight} kg</p>
              </div>
            </div>
            <div className="p-d-stats-container">
              <div className="p-d-stats-title">
                <p><b>Stats</b></p>
              </div>
              <div className="p-d-stat-container">
                <p>HP</p>
                <div className="p-d-stat-bar">
                  <div className="p-d-stat-bar-filled" style={{width: `${pokemonDetails.stats?.[0].base_stat}px`}}>
                    <p>{`${pokemonDetails.stats?.[0].base_stat}/150`}</p>
                  </div>
                </div>
              </div>
              <div className="p-d-stat-container">
                <p>Attack</p>
                <div className="p-d-stat-bar">
                  <div className="p-d-stat-bar-filled" style={{width: `${pokemonDetails.stats?.[1].base_stat}px`}}>
                    <p>{`${pokemonDetails.stats?.[1].base_stat}/150`}</p>
                  </div>
                </div>
              </div>
              <div className="p-d-stat-container">
                <p>Defense</p>
                <div className="p-d-stat-bar">
                  <div className="p-d-stat-bar-filled" style={{width: `${pokemonDetails.stats?.[2].base_stat}px`}}>
                    <p>{`${pokemonDetails.stats?.[2].base_stat}/150`}</p>
                  </div>
                </div>
              </div>
              <div className="p-d-stat-container">
                <p>Speed</p>
                <div className="p-d-stat-bar">
                  <div className="p-d-stat-bar-filled" style={{width: `${pokemonDetails.stats?.[3].base_stat}px`}}>
                    <p>{`${pokemonDetails.stats?.[3].base_stat}/150`}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-d-extra-stats-container">
              <div className="p-d-stats-title">
                <p><b>Extra stats</b></p>
              </div>
              <div className="p-d-stat-container">
                <p>Special attack</p>
                <div className="p-d-stat-bar">
                  <div className="p-d-stat-bar-filled" style={{width: `${pokemonDetails.stats?.[4].base_stat}px`}}>
                    <p>{`${pokemonDetails.stats?.[4].base_stat}/150`}</p>
                  </div>
                </div>
              </div>
              <div className="p-d-stat-container">
                <p>Special defense</p>
                <div className="p-d-stat-bar">
                  <div className="p-d-stat-bar-filled" style={{width: `${pokemonDetails.stats?.[5].base_stat}px`}}>
                    <p>{`${pokemonDetails.stats?.[5].base_stat}/150`}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-d-moves-container">
              <div className="p-d-moves-title">
                <p><b>Moves</b></p>
              </div>
              <ul className='p-d-moves-ul'>
                {moves.map(move => (
                  <li key={move.move.name}>
                    <p>{(move.move.name)[0].toUpperCase()+(move.move.name).substring(1).replace('-', ' ')}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailed;