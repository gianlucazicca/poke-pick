import type {Pokemon} from "pokenode-ts";

export interface TeamMember {
    order: number,
    pokemon: Pokemon | null,
    defeated: boolean
}

export interface TeamProps {
    team: TeamMember[]
}
