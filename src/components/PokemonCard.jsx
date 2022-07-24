import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PokemonCard = ({pokemon}) => {

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
  const [ pokemonData, setPokemonData ] = useState([]);
  //  React Router DOM
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(pokemon)
      .then(res => setPokemonData(res.data))
  }, [])

  const setColor = () => {
    for(let i in colors){
      if(colors[i].id === pokemonData.types?.[0].type.name){
        return colors[i].color
      }
    }
  }

  //  Javascript
  const pokemonName = pokemonData.name?.[0].toUpperCase() + pokemonData.name?.substring(1)
  const firstType = pokemonData.types?.[0]?.type?.name
  const secondType = pokemonData.types?.[1]?.type?.name
  const firstTypeFixed = firstType?.[0].toUpperCase() + firstType?.substring(1)
  const secondTypeFixed = secondType?.[0].toUpperCase() + secondType?.substring(1)

  return (
    <div onClick={() => navigate(`/pokedex/${pokemonData.id}`)}>
      <li className='pokemon-card' style={{backgroundColor: setColor()}}>
        <div className="p-c-bg">

        </div>
        <img src={pokemonData.sprites?.front_default} alt="" />
        <div className="card-details">
          <div className="p-name">
            <p><b>{pokemonName}</b></p>
          </div>
          <div className="t-details">
            <p><b>Type</b>: {pokemonData.types?.[1] ? `${firstTypeFixed} | ${secondTypeFixed}` : firstTypeFixed}</p>
          </div>
          <div className="f-details">
            <div>
              <p><b>Attack</b>: {pokemonData.stats?.[1].base_stat}</p>
            </div>
            <div>
              <p><b>Defense</b>: {pokemonData.stats?.[2].base_stat}</p>
            </div>
          </div>
        </div>
      </li>
    </div>
  );
};

export default PokemonCard;