import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import logo from "../img/pokeapi-logo.png";
import Pokedex from "./Pokedex";
import { IPokemon } from "./Pokemon";
import Searchbar from "./Searchbar";
import "./Container.css";

interface IPokemons {
    count: number;
    next: string | null;
    previous: string | null;
    results: {
        name: string;
        url: string;
    }[];
}

const Container: FC = () => {
    const [pokemons, setPokemons] = useState<IPokemon[]>([]);
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [searching, setSearching] = useState(false);
    const [order, setOrder] = useState(false);

    const fetchPokemons = async () => {
        try {
            setLoading(true);
            let url = `${process.env.REACT_APP_API_URL}?limit=${21}&offset=${
                21 * page
            }`;
            const response = await axios(url);
            const data: IPokemons = await response.data;

            const promises = data.results.map(async (pokemon) => {
                const response = await axios(pokemon.url);
                const data: IPokemon = await response.data;
                const responsespecies = await axios(data.species.url);
                const dataspecies = await responsespecies.data;
                const ev_chainresponse = await axios(
                    dataspecies.evolution_chain.url
                );
                const ev_chaindata = await ev_chainresponse.data;
                data.evolution = ev_chaindata.chain;
                return data;
            });
            const results = await Promise.all(promises);
            setPokemons(results);
            setLoading(false);
            setTotal(Math.ceil(data.count / 21));
            setNotFound(false);
        } catch (err) {}
    };

    useEffect(() => {
        if (!searching) {
            fetchPokemons();
        }
    }, [page]);

    const onSearch = async (pokemon: string) => {
        if (!pokemon) {
            return fetchPokemons();
        }
        setLoading(true);
        setNotFound(false);
        setSearching(true);
        let url = `${process.env.REACT_APP_API_URL}/${pokemon.toLowerCase()}`;
        try {
            const response = await axios.get(url);
            const result: IPokemon = await response.data;
            if (!result) {
                setNotFound(true);
                setLoading(false);
                return;
            } else {
                setPokemons([result]);
                setPage(0);
                setTotal(1);
            }
            setLoading(false);
            setSearching(false);
        } catch (error) {
            console.error(error);
            setNotFound(true);
            setLoading(false);
            return;
        }
    };

    let imgUrl = logo;
    const prop = {
        loading: loading,
        page: page,
        setPage: setPage,
        total: total,
    };

    let pokemons_aux: IPokemon[] = [];
    if (pokemons) {
        pokemons_aux = [...pokemons];
    }
    return (
        <div>
            <nav>
                <div onClick={ () => {setOrder(false); fetchPokemons();}}> 
                    <img
                        src={imgUrl}
                        alt="pokeapi-logo"
                        className="navbar-image"
                    />
                </div>
            </nav>
            <div className="App">
                <Searchbar onSearch={onSearch} pagination={prop} />
                {notFound ? (
                    <div className="not-found-text">🥺 NOT FOUND 🥺</div>
                ) : (
                    <div>
                        <div className="searchbar-btn" id="A-Z">
                        <button
                                onClick={() => {
                                    setOrder(false);
                                }}
                            >
                                ID
                            </button>
                            <button
                                onClick={() => {
                                    setOrder(true);
                                }}
                            >
                                A-Z
                            </button>
                        </div>
                        {order && (
                            <Pokedex
                                loading={loading}
                                pokemons={pokemons_aux.sort(function (a, b) {
                                    if (a.name > b.name) return 1;
                                    if (a.name < b.name) return -1;
                                    else {
                                        return 0;
                                    }
                                })}
                            />
                        )}
                        {!order && (
                            <Pokedex loading={loading} pokemons={pokemons} />
                        )}
                    </div>
                )}
            </div>
            <div className="footer"> Made with ❤ by Rocio and Agustina </div>
        </div>
    );
};

export default Container;
