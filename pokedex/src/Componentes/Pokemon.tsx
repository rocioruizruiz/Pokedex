import React, { FC } from "react";
import Tilt from "react-parallax-tilt";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import "./Pokemon.css";

export interface IPokemon {
    id: string;
    image: string;
    name: string;
    species: {
        url: string;
        name: string;
    };
    types: {
        type: {
            name: string;
            url: string;
        };
    }[];
    sprites: {
        front_default: string;
    };
    abilities: {
        ability: {
            name: string;
            url: string;
        };
    }[];
    weight: number;
    stats: IStats[];
    evolution?: IEv;
}

interface IStats {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}

export interface IEv {
    evolves_to: {
        evolves_to: {
            evolves_to: {
                evolves_to: string[];
                is_baby: boolean;
                species: {
                    name: string;
                    url: string;
                };
            }[];
            is_baby: boolean;
            species: {
                name: string;
                url: string;
            };
        }[];
        species: {
            name: string;
            url: string;
        };
    }[];
    is_baby: false;
    species: {
        name: string;
        url: string;
    };
}

interface IData {
    stat_name: string;
    value: number;
}

const Pokemon: FC<{ pokemon: IPokemon }> = (props: { pokemon: IPokemon }) => {
    const pokemon = props.pokemon;
    const style = "pokemon-card-" + pokemon.types[0].type.name;

    const data: IData[] = [];
    pokemon.stats.forEach((stat) => {
        data.push({
            stat_name: stat.stat.name.substring(0, 11),
            value: stat.base_stat,
        });
    });

    return (
        <Tilt>
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
                        <Popup
                            trigger={
                                <h2 className="popup"> {pokemon.name} </h2>
                            }
                            modal
                            nested
                        >
                            {(close: any) => (
                                <div className="modal">
                                    <div className="header-container">
                                        <button
                                            className="close"
                                            onClick={close}
                                        >
                                            &times;
                                        </button>
                                        <div className="header" id={style}>
                                            {pokemon.name}
                                        </div>
                                    </div>
                                    <div className="content">
                                        <div className="popup-img-container">
                                            <img
                                                src={
                                                    pokemon.sprites
                                                        .front_default
                                                }
                                                alt={pokemon.name}
                                                className="pokemon-popup-img"
                                            />
                                        </div>
                                        <div className="card-bottom" id="popup">
                                            <div
                                                className="pokemon-characteristics"
                                                id="popup-border"
                                            >
                                                <div className="pokemon-type">
                                                    <text>
                                                        <b>Type:</b>
                                                    </text>
                                                    {pokemon.types.map(
                                                        (type, idx) => {
                                                            return (
                                                                <div
                                                                    key={idx}
                                                                    id={
                                                                        type
                                                                            .type
                                                                            .name
                                                                    }
                                                                    className="pokemon-type-text"
                                                                >
                                                                    {
                                                                        type
                                                                            .type
                                                                            .name
                                                                    }
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                                <div className="pokemon-type">
                                                    <text>
                                                        <b>Abilities:</b>
                                                    </text>
                                                    {pokemon.abilities.map(
                                                        (ability, idx) => {
                                                            return (
                                                                <div
                                                                    key={idx}
                                                                    id={
                                                                        ability
                                                                            .ability
                                                                            .name
                                                                    }
                                                                    className="pokemon-ability-text"
                                                                >
                                                                    {
                                                                        ability
                                                                            .ability
                                                                            .name
                                                                    }
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                                <div className="pokemon-type">
                                                    <text>
                                                        <b>Weight:</b>{" "}
                                                        {pokemon.weight / 10} kg
                                                    </text>
                                                </div>
                                                <div
                                                    className="pokemon-type"
                                                    id="stats"
                                                >
                                                    <text>
                                                        <b>Statistics:</b>
                                                    </text>
                                                    <div>
                                                        <BarChart
                                                            width={350}
                                                            height={175}
                                                            data={data}
                                                        >
                                                            <CartesianGrid strokeDasharray="3 3" />
                                                            <XAxis
                                                                dataKey={
                                                                    "stat_name"
                                                                }
                                                                interval={0}
                                                                angle={345}
                                                                height={30}
                                                            />
                                                            <YAxis />
                                                            <Tooltip />
                                                            <Bar
                                                                dataKey="value"
                                                                fill="#8884d8"
                                                            />
                                                        </BarChart>
                                                    </div>
                                                </div>
                                                {pokemon.evolution &&
                                                    pokemon.evolution
                                                        .species && (
                                                        <div className="pokemon-type">
                                                            <text>
                                                                <b>
                                                                    Evolution
                                                                    Chain:
                                                                </b>
                                                            </text>
                                                            <div className="ev">
                                                                <div className="pokemon-ability-text">
                                                                    {pokemon.evolution &&
                                                                        pokemon
                                                                            .evolution
                                                                            .species
                                                                            .name}
                                                                </div>
                                                                <div className="pokemon-ability-text">
                                                                    {pokemon
                                                                        .evolution
                                                                        .evolves_to
                                                                        .length >
                                                                        0 &&
                                                                        pokemon
                                                                            .evolution
                                                                            .evolves_to[0]
                                                                            .species
                                                                            .name}
                                                                </div>
                                                                <div className="pokemon-ability-text">
                                                                    {pokemon
                                                                        .evolution
                                                                        .evolves_to
                                                                        .length >
                                                                        0 &&
                                                                        pokemon
                                                                            .evolution
                                                                            .evolves_to[0]
                                                                            .evolves_to[0] &&
                                                                        pokemon
                                                                            .evolution
                                                                            .evolves_to[0]
                                                                            .evolves_to[0]
                                                                            .species
                                                                            .name}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Popup>
                        <div>No.{pokemon.id}</div>
                    </div>
                    <div className="card-bottom">
                        <div className="pokemon-characteristics">
                            <div className="pokemon-type">
                                <text>
                                    <b>Type:</b>
                                </text>
                                {pokemon.types.map((type, idx) => {
                                    return (
                                        <div
                                            key={idx}
                                            id={type.type.name}
                                            className="pokemon-type-text"
                                        >
                                            {type.type.name}
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="pokemon-type">
                                <text>
                                    <b>Abilities:</b>
                                </text>
                                {pokemon.abilities.map((ability, idx) => {
                                    return (
                                        <div
                                            key={idx}
                                            id={ability.ability.name}
                                            className="pokemon-ability-text"
                                        >
                                            {ability.ability.name}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Tilt>
    );
};

export default Pokemon;
