"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const player_1 = require("./player");
class Game {
    constructor(player) {
        this.players = new Array(4);
        this.players.push(player);
        this.time = new Date();
    }
    isComplete() {
        if (this.players.length == 4) {
            return true;
        }
        else {
            return false;
        }
    }
    canAddPlayer(player) {
        if (this.players.length < 4) {
            if (this.players.find(e => (e.position == player.position)) == null) {
                return true;
            }
        }
        return false;
    }
    getOpenPositions() {
        if (this.players.length == 4) {
            return [];
        }
        else {
            let possiblePositions = [new player_1.PlayingPosition(player_1.PositionType.Attack, player_1.TeamType.Blue),
                new player_1.PlayingPosition(player_1.PositionType.Defence, player_1.TeamType.Blue),
                new player_1.PlayingPosition(player_1.PositionType.Attack, player_1.TeamType.Red),
                new player_1.PlayingPosition(player_1.PositionType.Defence, player_1.TeamType.Red)];
            for (const player of this.players) {
                const index = possiblePositions.indexOf(player.position);
                if (index > -1) {
                    possiblePositions.splice(index, 1);
                }
            }
            return possiblePositions;
        }
    }
    addPlayer(player) {
        if (this.canAddPlayer(player)) {
            this.players.push(player);
        }
    }
    removePlayer(player) {
        const index = this.players.indexOf(player, 0);
        if (index > -1) {
            this.players.splice(index, 1);
        }
    }
}
exports.Game = Game;
//# sourceMappingURL=game.js.map