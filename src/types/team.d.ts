import type {Pokemon} from "pokenode-ts";

export interface TeamMember {
    order: number,
    pokemon: Pokemon | null
}

export interface TeamProps {
    team: TeamMember[]
}
