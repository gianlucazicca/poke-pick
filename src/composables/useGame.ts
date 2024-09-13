import {useState} from "#app";
import type {GameState} from "~/types/state";
import type {Pokemon} from "pokenode-ts";

const createTeam = () => Array.from({length: 6}, (_, order) => ({order: order + 1, pokemon: null, defeated: false}));

const initialState: GameState = {
    running: false,
    starterIds: [1, 4, 7],
    loading: false,
    selectedPokemon: null,
    types: ['grass', 'fire', 'water'],
    team: createTeam(),
    npcTeam: createTeam()
};

export const useGame = () => {
    const gameState = useState<GameState>('state', () => initialState);

    const init = () => {
        gameState.value = {...initialState};
    };

    const start = () => {
        gameState.value.running = true;
    };

    const addToTeam = (pokemon: Pokemon | null, team: 'player' | 'npc' = 'player') => {
        const targetTeam = team === 'player' ? gameState.value.team : gameState.value.npcTeam;
        const freeSlot = targetTeam.find(slot => !slot.pokemon);

        if (freeSlot) {
            freeSlot.pokemon = pokemon;
            if (team === 'player') {
                gameState.value.selectedPokemon = null;
            }
        }
    };

    return {
        state: gameState,
        init,
        start,
        reset: init,
        addToTeam
    };
};