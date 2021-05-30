import React, {FC} from "react";

import Pokemon from "./Pokemon";
import {IPokemon} from './Pokemon'
import './Pokedex.css'
import ClipLoader from 'react-spinners/ClipLoader'
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
          {/* <ClipLoader color="#0000ff" size="50pxs"/> */}
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
