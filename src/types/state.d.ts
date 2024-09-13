import type {Pokemon} from "pokenode-ts";
import type {TeamMember} from "~/types/team";

type PokemonType = 'grass' | 'fire' | 'water';

export interface GameState {
    running: boolean;
    loading: boolean;
    selectedPokemon: Pokemon | null,
    team: TeamMember[],
    npcTeam: TeamMember[],
    starterIds: number[],
    types: PokemonType[]
}