import React, {FC} from "react";

import Pokemon from "./Pokemon";
import {IPokemon} from './Pokemon'
import './Pokedex.css'
import Pokeball from '../img/pokeballGif.png'


interface IProps {
    pokemons: IPokemon[],
    loading: boolean
}


const Pokedex:FC<IProps> = (props:IProps) => {
  const { pokemons, loading } = props;

  return (
    <div className="grid-container">
      {loading ? (
        <div className="ClipLoader">
          <img src={Pokeball} className="Loader" alt="Loader"></img>
        </div>
        
      ) : (
        <div className="pokedex-grid">
          {pokemons.map((pokemon) => {
            return <Pokemon pokemon={pokemon}  />;
          })}
        </div>
      )}
    </div>
  );
};

export default Pokedex;
