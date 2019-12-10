"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data = require("../data.json");
class DataHandler {
    getInformation(name) {
        //iterating through object
        for (var key in data) {
            //getting value
            const curName = data[key].name;
            //comparing names
            if (curName.localeCompare(name) == 0) {
                //getting information for name
                const information = data[key].information;
                console.log(information);
                return information;
            }
        }
    }
    getMoviesInGenre(genre) {
        let result = [];
        for (var key in data) {
            //getting value
            const curGenre = data[key].genre;
            //comparing names
            if (curGenre.localeCompare(genre) == 0) {
                //getting information for name
                const movieName = data[key].name;
                console.log(movieName);
                result.push(movieName);
            }
        }
        return result;
    }
    getActors(name) {
        //iterating through object
        for (var key in data) {
            //getting value
            const curName = data[key].name;
            //comparing names
            if (curName.localeCompare(name) == 0) {
                //getting information for name
                const actors = data[key].actors;
                console.log(actors);
                return actors;
            }
        }
    }
}
exports.DataHandler = DataHandler;
//# sourceMappingURL=DataHandler.js.map