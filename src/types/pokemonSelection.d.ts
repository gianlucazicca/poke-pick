import type {Pokemon} from "pokenode-ts";

export interface SelectionProps {
    pokemons: Pokemon[];
}

export interface PokemonSelectionProps {
    pokemon: Pokemon;
    isSelected: boolean;
}