
export enum PositionType {
    Attack,
    Defence,
}

export enum TeamType {
    Blue,
    Red,
}

export class PlayingPosition {
    position: PositionType
    team: TeamType

    constructor(position: PositionType, team: TeamType) {
        this.position = position
        this.team = team
    }
}

export class Player {
    id: string
    name: string
    position: PlayingPosition
    userId: string

    constructor(name: string, position: PlayingPosition) {
        this.name = name
        this.position = position
    }
}