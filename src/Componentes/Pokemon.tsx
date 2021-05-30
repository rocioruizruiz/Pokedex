import react, {FC, useState} from 'react'
import './Pokemon.css'

export interface IPokemon{
    id: string;
    image: string;
    name: string;
    types: {
        type: {
            "name": string,
            "url": string
        }
    }[]
    sprites: {
        front_default:string;
    }
    abilities: {
        ability: {
            name: string,
            url: string
        }
    }[]
}

const Pokemon:FC<{pokemon:IPokemon}> = (props:{pokemon:IPokemon}) => {
    const pokemon  = props.pokemon;
    const style = "pokemon-card-" + pokemon.types[0].type.name;
    return (
    <div className="pokemon-card" id={style}>
        <div className="pokemon-img-container">
        <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="pokemon-img"
        />
        </div>
        <div className="card-body">
            <div className="card-top">
                <h2>{pokemon.name}</h2>
                <div>{pokemon.id}</div>
            </div>
            <div className="card-bottom">
                <div className="pokemon-characteristics">
                    <div className="pokemon-type">
                        <text><b>Type:</b></text>
                        {pokemon.types.map((type, idx) => {
                            return (
                            <div key={idx} id={type.type.name} className="pokemon-type-text">
                                {type.type.name}
                            </div>
                            );
                        })}
                    </div >
                    <div className="pokemon-type">
                        <text><b>Abilities:</b></text>
                        {pokemon.abilities.map((ability, idx) => {
                            return (
                            <div key={idx} id={ability.ability.name} className="pokemon-ability-text">
                                {ability.ability.name}
                            </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Pokemon;
