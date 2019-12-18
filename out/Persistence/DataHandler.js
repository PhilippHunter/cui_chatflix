"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data = require("../data.json");
const watchlist = require("../watchlist.json");
const fs = require("fs");
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
    addToWatchlist(name) {
        //iterating through object
        for (var key in data) {
            //getting value
            const curName = data[key].name;
            //comparing names
            if (curName.localeCompare(name) == 0) {
                for (var entry in watchlist) {
                    if (watchlist[entry].name.localeCompare(name) == 0) {
                        return false;
                    }
                    else {
                        watchlist.push(data[key]);
                        var json = JSON.stringify(watchlist) + '\n';
                        fs.writeFileSync('src/watchlist.json', json);
                        return true;
                    }
                }
            }
        }
    }
    getMoviesInWatchlist() {
        let result = [];
        for (var key in watchlist) {
            //getting value
            const curName = watchlist[key].name;
            result.push(curName);
        }
        return result;
    }
    getMostLikedMovies() {
        let result = [];
        for (var key in data) {
            //getting value
            const curRating = data[key].rating;
            if (curRating > 4) {
                result.push(data[key].name);
            }
        }
        return result;
    }
}
exports.DataHandler = DataHandler;
//# sourceMappingURL=DataHandler.js.map