import React, { FC } from "react";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import Pokeball from "../img/pokeballGif.png";
import Pokemon, { IPokemon } from "./Pokemon";
import "./Pokedex.css";

interface IProps {
    pokemons: IPokemon[];
    loading: boolean;
}

const Pokedex: FC<IProps> = (props: IProps) => {
    const { pokemons, loading } = props;

    return (
        <div className="grid-container">
            <SimpleBar style={{ height: "100vh", width: "100vw" }}>
                {loading ? (
                    <div className="ClipLoader">
                        <img
                            src={Pokeball}
                            className="Loader"
                            alt="Loader"
                        ></img>
                    </div>
                ) : (
                    <div className="pokedex-grid">
                        {pokemons.map((pokemon) => {
                            return <Pokemon pokemon={pokemon} />;
                        })}
                    </div>
                )}
            </SimpleBar>
        </div>
    );
};

export default Pokedex;
