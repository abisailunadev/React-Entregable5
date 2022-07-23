import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PokemonCard = ({pokemon}) => {

  //  React
  const [ pokemonData, setPokemonData ] = useState([]);
  //  React Router DOM
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(pokemon)
      .then(res => setPokemonData(res.data))
  }, [])

  console.log(pokemonData)

  //  Javascript
  const pokemonName = pokemonData.name?.[0].toUpperCase() + pokemonData.name?.substring(1)
  const firstType = pokemonData.types?.[0]?.type?.name
  const secondType = pokemonData.types?.[1]?.type?.name
  const firstTypeFixed = firstType?.[0].toUpperCase() + firstType?.substring(1)
  const secondTypeFixed = secondType?.[0].toUpperCase() + secondType?.substring(1)

  return (
    <div onClick={() => navigate(`/pokedex/${pokemonData.id}`)}>
      <li className='pokemon-card'>
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