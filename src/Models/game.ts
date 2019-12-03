import {Player, PositionType, TeamType, PlayingPosition} from './player'


export class Game {
    players: Player[]
    time: Date

    constructor(player: Player) {
        this.players = new Array(4)
        this.players.push(player)
        this.time = new Date()
    }

    isComplete(): boolean {
        if (this.players.length == 4) {
            return true
        } else {
            return false
        }
    }

    canAddPlayer(player: Player): boolean {
        if (this.players.length < 4) {
            if (this.players.find(e => (e.position == player.position)) == null) {
                return true
            }
        }
        return false
    }

    getOpenPositions(): PlayingPosition[] {
        if (this.players.length == 4) {
            return []
        } else {
            let possiblePositions = [new PlayingPosition(PositionType.Attack, TeamType.Blue), 
                                    new PlayingPosition(PositionType.Defence, TeamType.Blue), 
                                    new PlayingPosition(PositionType.Attack, TeamType.Red), 
                                    new PlayingPosition(PositionType.Defence, TeamType.Red)]

            for (const player of this.players) {
                const index = possiblePositions.indexOf(player.position)
                if (index > -1) {
                    possiblePositions.splice(index, 1);
                }
            }

            return possiblePositions
        }
    }
    
    addPlayer(player: Player) {
        if (this.canAddPlayer(player)) {
            this.players.push(player)
        }
    }

    removePlayer(player: Player) {
        const index = this.players.indexOf(player, 0);
        if (index > -1) {
            this.players.splice(index, 1);
        }
    }
}