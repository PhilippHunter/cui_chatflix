"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PositionType;
(function (PositionType) {
    PositionType[PositionType["Attack"] = 0] = "Attack";
    PositionType[PositionType["Defence"] = 1] = "Defence";
})(PositionType = exports.PositionType || (exports.PositionType = {}));
var TeamType;
(function (TeamType) {
    TeamType[TeamType["Blue"] = 0] = "Blue";
    TeamType[TeamType["Red"] = 1] = "Red";
})(TeamType = exports.TeamType || (exports.TeamType = {}));
class PlayingPosition {
    constructor(position, team) {
        this.position = position;
        this.team = team;
    }
}
exports.PlayingPosition = PlayingPosition;
class Player {
    constructor(name, position) {
        this.name = name;
        this.position = position;
    }
}
exports.Player = Player;
//# sourceMappingURL=player.js.map