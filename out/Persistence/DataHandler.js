"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data = require("../data.json");
class DataHandler {
    getInformation(name) {
        //iterating through object
        for (var key in data) {
            //getting value
            const curName = JSON.stringify(data[key]['name']).slice(1, -1);
            //comparing names
            if (curName.localeCompare(name) == 0) {
                //getting information for name
                const information = JSON.stringify(data[key]['information']).slice(1, -1);
                console.log(information);
                return information;
            }
        }
    }
    getMoviesInGenre(genre) {
        let result = [];
        for (var key in data) {
            //getting value
            const curGenre = JSON.stringify(data[key]['genre']).slice(1, -1);
            //comparing names
            if (curGenre.localeCompare(genre) == 0) {
                //getting information for name
                const movieName = JSON.stringify(data[key]['name']).slice(1, -1);
                console.log(movieName);
                result.push(movieName);
            }
        }
        return result;
    }
}
exports.DataHandler = DataHandler;
//# sourceMappingURL=DataHandler.js.map